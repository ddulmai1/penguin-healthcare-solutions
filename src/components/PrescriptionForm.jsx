import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PrescriptionForm.module.css'
import { createPrescription } from '../services/prescriptionsService'

export default function PrescriptionForm({ demoMode = true }) {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    patientId: '',
    operatorId: '',
    medicalRecordId: '',
    medicationId: '',
    dose: '',
    prescribedDate: '',
    renew: false,
    renewalTime: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null); setSuccess(null)

    const { patientId, operatorId, medicalRecordId, medicationId, dose, prescribedDate, renew, renewalTime } = form
    if (!patientId || !operatorId || !medicalRecordId || !medicationId || !dose || !prescribedDate) {
      setError('Missing required fields')
      return
    }
    if (!/^\d+$/.test(String(dose)) || parseInt(dose, 10) <= 0) {
      setError('Dose must be a positive number')
      return
    }
    // Validate date (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(prescribedDate)) {
      setError('Prescribed date must be in YYYY-MM-DD format')
      return
    }
    // Validate time if renew is true (HH:mm or HH:mm:ss)
    if (renew && renewalTime && !/^\d{2}:\d{2}(:\d{2})?$/.test(renewalTime)) {
      setError('Renewal time must be HH:mm or HH:mm:ss')
      return
    }

    setSubmitting(true)
    const res = await createPrescription({
      patientId,
      operatorId,
      medicalRecordId,
      medicationId,
      dose: parseInt(dose, 10),
      prescribedDate,
      renew,
      renewalTime,
      demoMode
    })
    setSubmitting(false)
    if (!res.success) {
      setError(res.message || 'Failed to create prescription')
    } else {
      setSuccess('Prescription submitted successfully')
      setForm({ patientId: '', operatorId: '', medicalRecordId: '', medicationId: '', dose: '', prescribedDate: '', renew: false, renewalTime: '' })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Create e‑Prescription {demoMode}</h2>
        <button type="button" onClick={() => navigate('/dashboard')} className={styles.backButton}>
          ← Back to Dashboard
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>Patient ID<input name="patientId" value={form.patientId} onChange={handleChange} /></label>
          <label>Operator ID<input name="operatorId" value={form.operatorId} onChange={handleChange} /></label>
        </div>
        <div className={styles.row}>
          <label>Medical Record ID<input name="medicalRecordId" value={form.medicalRecordId} onChange={handleChange} /></label>
          <label>Medication ID<input name="medicationId" value={form.medicationId} onChange={handleChange} /></label>
        </div>
        <div className={styles.row}>
          <label>Dose<input name="dose" value={form.dose} onChange={handleChange} placeholder="e.g. 500" /></label>
          <label>Prescribed Date<input type="date" name="prescribedDate" value={form.prescribedDate} onChange={handleChange} /></label>
        </div>
        <div className={styles.row}>
          <label>
            Renew?
            <select name="renew" value={form.renew ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, renew: e.target.value === 'true' }))}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          <label>Renewal Time<input type="time" name="renewalTime" value={form.renewalTime} onChange={handleChange} /></label>
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Prescription'}</button>
        </div>
      </form>
    </div>
  )
}
