"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { submitADTMessage, getAdmissionRecords } from "../services/admissionsService"
import styles from "./AdmissionsNotifications.module.css"

export default function AdmissionsNotifications({ demoMode = false }) {
  const navigate = useNavigate()
  const [admissionRecords, setAdmissionRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  
  // ADT message form state
  const [adtForm, setAdtForm] = useState({
    patientId: "",
    admissionType: "ADMISSION",
    encounterType: "INPATIENT",
    timestamp: new Date().toISOString().slice(0, 16),
    assignedClinician: "",
    department: "",
    roomNumber: "",
    notes: "",
  })

  useEffect(() => {
    loadAdmissionRecords()
  }, [demoMode])

  const loadAdmissionRecords = async () => {
    if (demoMode) {
      // Mock data for demo mode
      setAdmissionRecords([
        {
          id: 1,
          patientId: "P001",
          patientName: "John Doe",
          admissionType: "ADMISSION",
          encounterType: "INPATIENT",
          timestamp: "2025-11-16T10:30:00",
          assignedClinician: "Dr. Smith",
          department: "Cardiology",
          status: "PROCESSED",
        },
        {
          id: 2,
          patientId: "P002",
          patientName: "Jane Smith",
          admissionType: "DISCHARGE",
          encounterType: "INPATIENT",
          timestamp: "2025-11-16T14:15:00",
          assignedClinician: "Dr. Johnson",
          department: "Emergency",
          status: "PROCESSED",
        },
      ])
      return
    }

    try {
      setLoading(true)
      const result = await getAdmissionRecords()
      if (result.success) {
        setAdmissionRecords(result.data)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Failed to load admission records")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAdtForm(prev => ({ ...prev, [name]: value }))
    setError("")
    setSuccessMessage("")
  }

  const handleSubmitADT = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    // Validation
    if (!adtForm.patientId || !adtForm.admissionType || !adtForm.timestamp) {
      setError("Patient ID, Admission Type, and Timestamp are required")
      return
    }

    if (demoMode) {
      setSuccessMessage(
        `✓ ADT message processed (demo mode): ${adtForm.admissionType} for Patient ${adtForm.patientId}`
      )
      // Add to local records in demo mode
      const newRecord = {
        id: Date.now(),
        patientId: adtForm.patientId,
        patientName: "Demo Patient",
        ...adtForm,
        status: "PROCESSED",
      }
      setAdmissionRecords(prev => [newRecord, ...prev])
      // Reset form
      setAdtForm({
        patientId: "",
        admissionType: "ADMISSION",
        encounterType: "INPATIENT",
        timestamp: new Date().toISOString().slice(0, 16),
        assignedClinician: "",
        department: "",
        roomNumber: "",
        notes: "",
      })
      return
    }

    try {
      setLoading(true)
      const result = await submitADTMessage(adtForm)
      
      if (result.success) {
        setSuccessMessage(
          `✓ ADT message processed successfully. Confirmation ID: ${result.data.confirmationId || "N/A"}`
        )
        // Reload records
        await loadAdmissionRecords()
        // Reset form
        setAdtForm({
          patientId: "",
          admissionType: "ADMISSION",
          encounterType: "INPATIENT",
          timestamp: new Date().toISOString().slice(0, 16),
          assignedClinician: "",
          department: "",
          roomNumber: "",
          notes: "",
        })
      } else {
        setError(result.message || "Failed to process ADT message")
      }
    } catch (err) {
      setError("An unexpected error occurred while processing the ADT message")
    } finally {
      setLoading(false)
    }
  }

  const getAdmissionTypeLabel = (type) => {
    const labels = {
      ADMISSION: "Admission",
      DISCHARGE: "Discharge",
      TRANSFER: "Transfer",
    }
    return labels[type] || type
  }

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      PROCESSED: styles.statusProcessed,
      PENDING: styles.statusPending,
      ERROR: styles.statusError,
    }
    return `${styles.statusBadge} ${statusMap[status] || ""}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerControls}>
        <button className={styles.backBtn} onClick={() => navigate("/dashboard")} title="Go back to dashboard">
          ← Back to Dashboard
        </button>
        {demoMode && <span className={styles.demoIndicator}>Demo Mode</span>}
      </div>

      <h2 className={styles.pageTitle}>Admission Notifications (UC-4)</h2>
      <p className={styles.pageDescription}>
        Process admission, discharge, and transfer (ADT) messages from the Admissions subsystem.
      </p>

      {error && (
        <div className={styles.errorMessage}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {/* ADT Message Submission Form */}
      <section className={styles.formSection}>
        <h3>Submit ADT Message</h3>
        <form onSubmit={handleSubmitADT} className={styles.adtForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="patientId">Patient ID *</label>
              <input
                id="patientId"
                name="patientId"
                type="text"
                value={adtForm.patientId}
                onChange={handleInputChange}
                placeholder="e.g., P001, 1"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="admissionType">Message Type *</label>
              <select
                id="admissionType"
                name="admissionType"
                value={adtForm.admissionType}
                onChange={handleInputChange}
                required
              >
                <option value="ADMISSION">Admission</option>
                <option value="DISCHARGE">Discharge</option>
                <option value="TRANSFER">Transfer</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="encounterType">Encounter Type</label>
              <select
                id="encounterType"
                name="encounterType"
                value={adtForm.encounterType}
                onChange={handleInputChange}
              >
                <option value="INPATIENT">Inpatient</option>
                <option value="OUTPATIENT">Outpatient</option>
                <option value="EMERGENCY">Emergency</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="timestamp">Timestamp *</label>
              <input
                id="timestamp"
                name="timestamp"
                type="datetime-local"
                value={adtForm.timestamp}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="assignedClinician">Assigned Clinician</label>
              <input
                id="assignedClinician"
                name="assignedClinician"
                type="text"
                value={adtForm.assignedClinician}
                onChange={handleInputChange}
                placeholder="Dr. Name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="department">Department</label>
              <input
                id="department"
                name="department"
                type="text"
                value={adtForm.department}
                onChange={handleInputChange}
                placeholder="e.g., Cardiology"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="roomNumber">Room Number</label>
              <input
                id="roomNumber"
                name="roomNumber"
                type="text"
                value={adtForm.roomNumber}
                onChange={handleInputChange}
                placeholder="e.g., 301A"
              />
            </div>

            <div className={styles.formGroup} style={{ flex: 2 }}>
              <label htmlFor="notes">Notes</label>
              <input
                id="notes"
                name="notes"
                type="text"
                value={adtForm.notes}
                onChange={handleInputChange}
                placeholder="Additional information"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Processing..." : "Submit ADT Message"}
          </button>
        </form>
      </section>

      {/* Admission Records Display */}
      <section className={styles.recordsSection}>
        <h3>Recent ADT Messages</h3>
        {loading && admissionRecords.length === 0 ? (
          <div className={styles.loading}>Loading admission records...</div>
        ) : admissionRecords.length === 0 ? (
          <div className={styles.emptyState}>No admission records found</div>
        ) : (
          <div className={styles.recordsTable}>
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Message Type</th>
                  <th>Encounter</th>
                  <th>Clinician</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {admissionRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.timestamp).toLocaleString()}</td>
                    <td><strong>{record.patientId}</strong></td>
                    <td>{record.patientName || "N/A"}</td>
                    <td>{getAdmissionTypeLabel(record.admissionType)}</td>
                    <td>{record.encounterType}</td>
                    <td>{record.assignedClinician || "—"}</td>
                    <td>{record.department || "—"}</td>
                    <td>
                      <span className={getStatusBadgeClass(record.status)}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
