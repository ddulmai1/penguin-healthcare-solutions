// Unified API root for consistency with other services (authService pattern)
const API_ROOT = "http://localhost:8080"

// Demo storage to simulate pharmacy acknowledgment
let demoPrescriptions = []

export async function createPrescription({ patientId, operatorId, medicalRecordId, medicationId, dose, prescribedDate, renew, renewalTime, demoMode = false }) {
  if (demoMode) {
    const id = Date.now()
    const record = { id, patientId, operatorId, medicalRecordId, medicationId, dose, prescribedDate, renew, renewalTime, status: 'ACKNOWLEDGED' }
    demoPrescriptions.push(record)
    return { success: true, data: { confirmationId: id, status: 'ACKNOWLEDGED' } }
  }
  try {
    const res = await fetch(API_ROOT + "/api/prescriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, operatorId, medicalRecordId, medicationId, dose, prescribedDate, renew, renewalTime })
    })
    if (!res.ok) {
      const txt = await res.text()
      return { success: false, message: `Server error ${res.status} ${txt}` }
    }
    const data = await res.json()
    return { success: true, data }
  } catch (e) {
    console.error("Error creating prescription", e)
    return { success: false, message: "Unable to connect to server" }
  }
}
