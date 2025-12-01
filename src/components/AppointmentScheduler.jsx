import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listAppointments, scheduleAppointment, modifyAppointment, cancelAppointment } from '../services/appointmentsService'
import styles from './AppointmentScheduler.module.css'

const TYPES = ['PHYSICAL', 'CONSULTATION', 'LAB', 'FOLLOWUP', 'CONCERN']

// Demo operators - will be replaced with backend fetch
const DEMO_OPERATORS = [
  { id: 'O100', name: 'Dr. Smith', role: 'DOCTOR' },
  { id: 'O101', name: 'Dr. Johnson', role: 'DOCTOR' },
  { id: 'O102', name: 'Nurse Williams', role: 'NURSE' },
  { id: 'O103', name: 'Dr. Brown', role: 'DOCTOR' },
  { id: 'O104', name: 'Nurse Davis', role: 'NURSE' }
]

export default function AppointmentScheduler({ demoMode = true }) {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [operators, setOperators] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    patientId: '',
    patientName: '',
    preferredContact: 'EMAIL',
    contactAddress: '',
    operatorId: '',
    operatorName: '',
    date: '',
    time: '',
    type: 'FOLLOWUP',
    notes: ''
  })
  const [editId, setEditId] = useState(null)

  const fetchAppointments = async () => {
    setLoading(true)
    const res = await listAppointments({ demoMode })
    if (res.success) {
      setAppointments(res.data)
      setError(null)
    } else {
      // Suppress backend connectivity error and fallback to demo data transparently
//       if (!demoMode && res.message === 'Unable to connect to server') {
//         const demoRes = await listAppointments({ demoMode: true })
//         if (demoRes.success) {
//           setAppointments(demoRes.data)
//           setError(null)
//         } else {
//           // Only show an error if even demo data fails (unlikely)
//           setError(demoRes.message || 'Failed to load appointments')
//         }
//       } else {
//         setError(res.message || 'Failed to load appointments')
//       }
    }
setLoading(false)
}

  const fetchOperators = async () => {
    if (demoMode) {
      setOperators(DEMO_OPERATORS)
      return
    }
    // Fetch from backend when available
    try {
      // Use relative path to leverage React dev proxy in package.json
      const res = await fetch('/api/operators/all')
      if (res.ok) {
        const data = await res.json()
        const ops = data.map(op => ({
          id: op.id,
          name: `${op.firstName} ${op.lastName}`,
          role: op.role
        }))
        setOperators(ops)
      } else {
        setOperators(DEMO_OPERATORS)
      }
    } catch (e) {
      console.error('Failed to fetch operators', e)
      setOperators(DEMO_OPERATORS)
    }
  }

  useEffect(() => { 
    fetchAppointments()
    fetchOperators()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'operatorId') {
      const selectedOp = operators.find(op => op.id === value)
      setForm(f => ({ 
        ...f, 
        operatorId: value, 
        operatorName: selectedOp ? selectedOp.name : '' 
      }))
    } else if (name === 'preferredContact') {
      setForm(f => ({ ...f, preferredContact: value }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  // Normalize time to HH:mm:ss format
  function normalizeTime(time) {
    if (!time) return time
    return time.length === 5 ? time + ':00' : time
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const { patientId, patientName, preferredContact, contactAddress, operatorId, operatorName, date, time, type, notes } = form
    if (!patientId || !operatorId || !date || !time || !type) {
      setError('Missing required fields')
      return
    }
    // Require contact address and validate by type
    if (!contactAddress) {
      setError('Please provide a contact address')
      return
    }
    if (preferredContact === 'EMAIL') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactAddress)) {
        setError('Please enter a valid email')
        return
      }
    } else if (preferredContact === 'SMS') {
      if (!/^\+?[0-9\-\s]{7,15}$/.test(contactAddress)) {
        setError('Please enter a valid phone number')
        return
      }
    }

    const normalizedTime = normalizeTime(time)

    if (editId) {
      const res = await modifyAppointment({ id: editId, date, time: normalizedTime, type, notes, demoMode })
      if (!res.success) {
        setError(res.message)
      } else {
        setForm({ patientId: '', patientName: '', preferredContact: 'EMAIL', contactAddress: '', operatorId: '', operatorName: '', date: '', time: '', type: 'FOLLOWUP', notes: '' })
        setEditId(null)
        fetchAppointments()
      }
      return
    }

    const res = await scheduleAppointment({ patientId, patientName, preferredContact, contactAddress, operatorId, operatorName, date, time: normalizedTime, type, notes, demoMode })
    if (!res.success) {
      setError(res.message)
    } else {
      setForm({ patientId: '', patientName: '', preferredContact: 'EMAIL', contactAddress: '', operatorId: '', operatorName: '', date: '', time: '', type: 'FOLLOWUP', notes: '' })
      fetchAppointments()
    }
  }

  function handleEdit(appt) {
    setForm({
      patientId: appt.patientId,
      patientName: appt.patientName || '',
      preferredContact: appt.preferredContact || 'EMAIL',
      contactAddress: appt.contactAddress || '',
      operatorId: appt.operatorId,
      operatorName: appt.operatorName || '',
      date: appt.date,
      time: appt.time?.slice(0,5) || '',
      type: appt.type,
      notes: appt.notes || ''
    })
    setEditId(appt.id)
    setError(null)
  }

  async function handleCancel(appt) {
    const res = await cancelAppointment(appt.id, demoMode)
    if (!res.success) setError(res.message)
    else fetchAppointments()
  }

  function clearEdit() {
    setEditId(null)
    setForm({ patientId: '', patientName: '', preferredContact: 'EMAIL', contactAddress: '', operatorId: '', operatorName: '', date: '', time: '', type: 'FOLLOWUP', notes: '' })
    setError(null)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Appointment Scheduler {demoMode && <span className={styles.badge}>Demo</span>}</h2>
        <button type="button" onClick={() => navigate('/dashboard')} className={styles.backButton}>
          ← Back to Dashboard
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>Patient ID<input name="patientId" value={form.patientId} onChange={handleChange} /></label>
          <label>Patient Name<input name="patientName" value={form.patientName} onChange={handleChange} /></label>
        </div>
        <div className={styles.row}>
          <label>
            Preferred Contact
            <select name="preferredContact" value={form.preferredContact} onChange={handleChange}>
              <option value="EMAIL">Email</option>
              <option value="SMS">SMS</option>
            </select>
          </label>
          <label>
            {form.preferredContact === 'SMS' ? 'Phone' : 'Email'}
            <input name="contactAddress" value={form.contactAddress} onChange={handleChange} placeholder={form.preferredContact === 'SMS' ? 'e.g. +15551234567' : 'patient@example.com'} />
          </label>
        </div>
        <div className={styles.row}>
          <label>
            Select Operator
            <select name="operatorId" value={form.operatorId} onChange={handleChange}>
              <option value="">-- Choose Operator --</option>
              {operators.map(op => (
                <option key={op.id} value={op.id}>
                  {op.name} ({op.role})
                </option>
              ))}
            </select>
          </label>
          <label>Operator ID (auto-filled)<input name="operatorId" value={form.operatorId} readOnly disabled /></label>
        </div>
        <div className={styles.row}>
          <label>Date<input type="date" name="date" value={form.date} onChange={handleChange} /></label>
          <label>Time<input type="time" name="time" value={form.time} onChange={handleChange} /></label>
          <label>Type<select name="type" value={form.type} onChange={handleChange}>{TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></label>
        </div>
        <label>Notes<textarea name="notes" value={form.notes} onChange={handleChange} /></label>
        <div className={styles.actions}>
          <button type="submit">{editId ? 'Update Appointment' : 'Schedule Appointment'}</button>
          {editId && <button type="button" onClick={clearEdit}>Cancel Edit</button>}
        </div>
      </form>
      <h3>Existing Appointments</h3>
      {loading ? <div>Loading...</div> : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>Patient ID</th><th>Patient Name</th><th>Operator ID</th><th>Operator Name</th><th>Date</th><th>Time</th><th>Type</th><th>Notes</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.patientId}</td>
                <td>{a.patientName}</td>
                <td>{a.operatorId}</td>
                <td>{a.operatorName}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.type}</td>
                <td>{a.notes}</td>
                <td>
                  <button onClick={() => handleEdit(a)}>Edit</button>
                  <button onClick={() => handleCancel(a)}>Cancel</button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && <tr><td colSpan={10}>No appointments</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  )
}
