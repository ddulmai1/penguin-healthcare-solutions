"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPatientRecord, updatePatientRecord } from "../services/patientRecordService"
import { getMockPatientRecord } from "../data/mockPatientData"
import styles from "./UpdatePatientRecord.module.css"

export default function UpdatePatientRecord({ userRole = "Clinician", demoMode = false }) {
  const navigate = useNavigate()
  const { patientId } = useParams()
  const [patientRecord, setPatientRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [newHistory, setNewHistory] = useState({ condition: "", diagnosedDate: "", status: "", notes: "" })
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "", prescribedBy: "", prescribedDate: "" })

  useEffect(() => {
    const loadRecord = async () => {
      if (!patientId) {
        setError("No patient ID provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        let record

        if (demoMode) {
          record = getMockPatientRecord(patientId)
          if (!record) {
            setError("Patient record not found in demo mode")
            setLoading(false)
            return
          }
        } else {
          const response = await getPatientRecord(patientId)
          if (!response.success) {
            setError(response.message || "Failed to load patient record")
            setLoading(false)
            return
          }
          record = response.data
        }

        setPatientRecord(record)
      } catch (err) {
        setError("An error occurred while loading the record")
      } finally {
        setLoading(false)
      }
    }

    loadRecord()
  }, [patientId, demoMode])

  const handleAddHistory = () => {
    setError("")
    if (!newHistory.condition || !newHistory.diagnosedDate) {
      setError("Condition and Diagnosed Date are required for medical history")
      return
    }

    const updated = { ...patientRecord }
    updated.medicalHistory = updated.medicalHistory ? [...updated.medicalHistory, { ...newHistory, id: Date.now() }] : [{ ...newHistory, id: Date.now() }]
    setPatientRecord(updated)
    setNewHistory({ condition: "", diagnosedDate: "", status: "", notes: "" })
  }

  const handleAddMedication = () => {
    setError("")
    if (!newMedication.name || !newMedication.dosage) {
      setError("Medication name and dosage are required")
      return
    }

    const updated = { ...patientRecord }
    updated.medications = updated.medications ? [...updated.medications, { ...newMedication, id: Date.now() }] : [{ ...newMedication, id: Date.now() }]
    setPatientRecord(updated)
    setNewMedication({ name: "", dosage: "", frequency: "", prescribedBy: "", prescribedDate: "" })
  }

  const handleSaveChanges = async () => {
    setError("")
    setSuccessMessage("")

    if (demoMode) {
      setSuccessMessage("Record updated (demo mode). Changes are visible locally only.")
      return
    }

    try {
      setLoading(true)
      const result = await updatePatientRecord(patientId, patientRecord)
      if (!result.success) {
        setError(result.message || "Failed to update record")
        return
      }
      setPatientRecord(result.data)
      setSuccessMessage("Record successfully updated")
      setTimeout(() => navigate("/dashboard"), 1500)
    } catch (err) {
      setError("An unexpected error occurred while saving")
    } finally {
      setLoading(false)
    }
  }

  if (loading && !patientRecord) {
    return (
      <div className={styles["update-patient-container"]}>
        <div className={styles["loading"]}>Loading patient record...</div>
      </div>
    )
  }

  return (
    <div className={styles["update-patient-container"]}>
      <div className={styles["header-controls"]}>
        <button className={styles["back-btn"]} onClick={() => navigate("/dashboard")} title="Go back to dashboard">
          ← Back to Dashboard
        </button>
      </div>

      <h2>Update Patient Record</h2>

      {error && (
        <div className={styles["error-message"]}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className={styles["success-message"]}>
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      {patientRecord && (
        <div className={styles["update-form"]}>
          <h3>Patient: {patientRecord.demographics ? `${patientRecord.demographics.firstName} ${patientRecord.demographics.lastName}` : patientRecord.name}</h3>

          {/* Read-only Patient Information (same as view page) */}
          <section className={styles["record-section"]}>
            <h4>Patient Information</h4>
            <div className={styles["info-grid"]}>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Patient ID:</span>
                <span className={styles["value"]}>{patientRecord.patientID || patientRecord.patientId}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Name:</span>
                <span className={styles["value"]}>
                  {patientRecord.demographics
                    ? `${patientRecord.demographics.firstName} ${patientRecord.demographics.lastName}`
                    : patientRecord.name}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Date of Birth:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.dateOfBirth || patientRecord.dateOfBirth}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Age:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.age || "N/A"}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Gender:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.gender || patientRecord.gender}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Blood Type:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.bloodType || "N/A"}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Phone:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.phone || patientRecord.contact}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Email:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.email || "N/A"}</span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>Address:</span>
                <span className={styles["value"]}>{patientRecord.demographics?.address || patientRecord.address}</span>
              </div>
            </div>
          </section>

          <section className={styles["form-section"]}>
            <h4>Add Medical History</h4>
            <div className={styles["form-inline"]}>
              <input
                placeholder="Condition"
                value={newHistory.condition}
                onChange={(e) => setNewHistory({ ...newHistory, condition: e.target.value })}
              />
              <input
                placeholder="Diagnosed Date (YYYY-MM-DD)"
                type="date"
                value={newHistory.diagnosedDate}
                onChange={(e) => setNewHistory({ ...newHistory, diagnosedDate: e.target.value })}
              />
              <input
                placeholder="Status (e.g., Ongoing, Resolved)"
                value={newHistory.status}
                onChange={(e) => setNewHistory({ ...newHistory, status: e.target.value })}
              />
              <input
                placeholder="Notes"
                value={newHistory.notes}
                onChange={(e) => setNewHistory({ ...newHistory, notes: e.target.value })}
              />
              <button className={styles["add-btn"]} onClick={handleAddHistory}>
                + Add History
              </button>
            </div>

            {patientRecord.medicalHistory && patientRecord.medicalHistory.length > 0 && (
              <div className={styles["added-items"]}>
                <h5>Current Medical History:</h5>
                {patientRecord.medicalHistory.map((item, index) => (
                  <div key={index} className={styles["item-card"]}>
                    <div className={styles["item-header"]}>
                      <strong>{item.condition}</strong>
                      <span className={styles["item-badge"]}>{item.status || "N/A"}</span>
                    </div>
                    <p>Diagnosed: {item.diagnosedDate}</p>
                    {item.notes && <p className={styles["item-notes"]}>Notes: {item.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={styles["form-section"]}>
            <h4>Add Medication</h4>
            <div className={styles["form-inline"]}>
              <input
                placeholder="Medication Name"
                value={newMedication.name}
                onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              />
              <input
                placeholder="Dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              />
              <input
                placeholder="Frequency"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
              />
              <input
                placeholder="Prescribed By"
                value={newMedication.prescribedBy}
                onChange={(e) => setNewMedication({ ...newMedication, prescribedBy: e.target.value })}
              />
              <input
                placeholder="Prescribed Date"
                type="date"
                value={newMedication.prescribedDate}
                onChange={(e) => setNewMedication({ ...newMedication, prescribedDate: e.target.value })}
              />
              <button className={styles["add-btn"]} onClick={handleAddMedication}>
                + Add Medication
              </button>
            </div>

            {patientRecord.medications && patientRecord.medications.length > 0 && (
              <div className={styles["added-items"]}>
                <h5>Current Medications:</h5>
                <table className={styles["items-table"]}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Prescribed By</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientRecord.medications.map((med, index) => (
                      <tr key={index}>
                        <td>{med.name}</td>
                        <td>{med.dosage}</td>
                        <td>{med.frequency || "N/A"}</td>
                        <td>{med.prescribedBy || "N/A"}</td>
                        <td>{med.prescribedDate || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <div className={styles["form-actions"]}>
            <button className={styles["save-btn"]} onClick={handleSaveChanges} disabled={loading}>
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>
            <button className={styles["cancel-btn"]} onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
