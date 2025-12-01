// Unified API root (consistent with authService.js direct absolute fetch usage)
const API_ROOT = "http://localhost:8080"

// In-memory demo storage (not persisted) for demoMode usage
let demoAppointments = [
  {
    id: 1,
    patientId: "P001",
    patientName: "John Doe",
    preferredContact: "EMAIL",
    contactAddress: "john.doe@example.com",
    operatorId: "O100",
    operatorName: "Dr. Smith",
    date: "2025-12-05",
    time: "09:00:00",
    type: "FOLLOWUP",
    notes: "Follow-up visit",
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Jane Smith",
    preferredContact: "SMS",
    contactAddress: "+15551234567",
    operatorId: "O100",
    operatorName: "Dr. Smith",
    date: "2025-12-05",
    time: "10:00:00",
    type: "CONSULTATION",
    notes: "Initial consult",
  },
]

let demoNotifications = []

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

// Check if operator already has appointment at this date/time
function hasConflict(appointments, operatorId, date, time, excludeId) {
  return appointments.some(a => {
    if (a.operatorId !== operatorId) return false
    if (excludeId && a.id === excludeId) return false
    return a.date === date && a.time === time
  })
}

// --- Appointment CRUD ---
export async function listAppointments({ patientId, operatorId, demoMode = false }) {
  if (demoMode) {
    return {
      success: true,
      data: demoAppointments.filter(a => (!patientId || a.patientId === patientId) && (!operatorId || a.operatorId === operatorId))
    }
  }
  // Backend controller not present; leaving placeholder for future implementation
  try {
    const url = new URL(API_ROOT + "/api/appointments")
    if (patientId) url.searchParams.append("patientId", patientId)
    if (operatorId) url.searchParams.append("operatorId", operatorId)
    const res = await fetch(url, { headers: { "Content-Type": "application/json" } })
    if (!res.ok) return { success: false, message: "Failed to retrieve appointments" }
    return { success: true, data: await res.json() }
  } catch (e) {
    console.error("Error listing appointments", e)
    return { success: false, message: "Unable to connect to server" }
  }
}

export async function scheduleAppointment({ patientId, patientName, preferredContact, contactAddress, operatorId, operatorName, date, time, type, notes, demoMode = false }) {
  if (demoMode) {
    if (!patientId || !operatorId || !date || !time || !type) return { success: false, message: "Missing required fields" }
    if (hasConflict(demoAppointments, operatorId, date, time)) {
      return { success: false, message: `Time slot ${time} on ${date} is already booked for this operator` }
    }
    const appt = { id: generateId(), patientId, patientName: patientName || "", preferredContact: preferredContact || "EMAIL", contactAddress: contactAddress || "", operatorId, operatorName: operatorName || "", date, time, type, notes: notes || "" }
    demoAppointments.push(appt)
    return { success: true, data: appt }
  }
  try {
    const res = await fetch(API_ROOT + "/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Assuming future DTO maps patientId/operatorId to Patient/Operator entities server-side
      body: JSON.stringify({ patientId, patientName, preferredContact, contactAddress, operatorId, operatorName, date, time, type, notes })
    })
    if (!res.ok) {
      const txt = await res.text()
      return { success: false, message: `Server error ${res.status} ${txt}` }
    }
    return { success: true, data: await res.json() }
  } catch (e) {
    console.error("Error scheduling appointment", e)
    return { success: false, message: "Unable to connect to server" }
  }
}

export async function modifyAppointment({ id, date, time, type, notes, demoMode = false }) {
  if (demoMode) {
    const idx = demoAppointments.findIndex(a => a.id === id)
    if (idx === -1) return { success: false, message: "Appointment not found" }
    const target = demoAppointments[idx]
    if (date && time && hasConflict(demoAppointments, target.operatorId, date, time, id)) {
      return { success: false, message: `Time slot ${time} on ${date} is already booked for this operator` }
    }
    const updated = { ...target, date: date || target.date, time: time || target.time, type: type || target.type, notes: notes ?? target.notes }
    demoAppointments[idx] = updated
    return { success: true, data: updated }
  }
  try {
    const res = await fetch(API_ROOT + "/api/appointments/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time, type, notes })
    })
    if (!res.ok) return { success: false, message: "Failed to modify appointment" }
    return { success: true, data: await res.json() }
  } catch (e) {
    console.error("Error modifying appointment", e)
    return { success: false, message: "Unable to connect to server" }
  }
}

export async function cancelAppointment(id, demoMode = false) {
  if (demoMode) {
    const idx = demoAppointments.findIndex(a => a.id === id)
    if (idx === -1) return { success: false, message: "Appointment not found" }
    // Match backend semantics: remove appointment
    const removed = demoAppointments.splice(idx, 1)[0]
    return { success: true, data: removed }
  }
  try {
    const res = await fetch(API_ROOT + "/api/appointments/" + id, { method: "DELETE" })
    if (!res.ok) return { success: false, message: "Failed to cancel appointment" }
    return { success: true }
  } catch (e) {
    console.error("Error cancelling appointment", e)
    return { success: false, message: "Unable to connect to server" }
  }
}

// --- Reminders (UC-6) demo scaffolding ---
export async function listDueReminders({ horizonHours = 24, demoMode = false }) {
  if (demoMode) {
    const now = Date.now()
    return {
      success: true,
      data: demoAppointments.filter(a => {
        const at = new Date(`${a.date}T${a.time}`).getTime()
        const diffH = (at - now) / 3600000
        return diffH <= horizonHours && diffH > 0
      }).map(a => ({
        appointmentId: a.id,
        patientId: a.patientId,
        preferredContact: a.preferredContact || 'EMAIL',
        contactAddress: a.contactAddress || null,
        operatorId: a.operatorId,
        scheduledAt: `${a.date}T${a.time}`,
        status: "PENDING"
      }))
    }
  }
  try {
    const res = await fetch(API_ROOT + "/api/appointments/reminders?hours=" + horizonHours)
    if (!res.ok) return { success: false, message: "Failed to retrieve reminders" }
    return { success: true, data: await res.json() }
  } catch (e) {
    console.error("Error listing reminders", e)
    return { success: false, message: "Unable to connect to server" }
  }
}

export async function sendReminder(appointmentId, demoMode = false) {
  if (demoMode) {
    const exists = demoNotifications.find(n => n.appointmentId === appointmentId)
    if (exists) return { success: false, message: "Reminder already sent" }
    const rec = { id: generateId(), appointmentId, status: "DELIVERED", timestamp: new Date().toISOString() }
    demoNotifications.push(rec)
    return { success: true, data: rec }
  }
  try {
    const res = await fetch(API_ROOT + "/api/appointments/reminders/" + appointmentId, { method: "POST" })
    if (!res.ok) return { success: false, message: "Failed to send reminder" }
    return { success: true, data: await res.json() }
  } catch (e) {
    console.error("Error sending reminder", e)
    return { success: false, message: "Unable to connect to server" }
  }
}

export async function retryReminder(reminderId, demoMode = false) {
  if (demoMode) {
    const notif = demoNotifications.find(n => n.id === reminderId)
    if (!notif) return { success: false, message: "Reminder not found" }
    notif.status = "DELIVERED"
    return { success: true, data: notif }
  }
  try {
    const res = await fetch(API_ROOT + "/api/appointments/reminders/retry/" + reminderId, { method: "POST" })
    if (!res.ok) return { success: false, message: "Failed to retry reminder" }
    return { success: true, data: await res.json() }
  } catch (e) {
    console.error("Error retrying reminder", e)
    return { success: false, message: "Unable to connect to server" }
  }
}
