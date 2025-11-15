"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyAccess, getPatientRecord } from "../services/patientRecordService"
import { getMockPatientRecord } from "../data/mockPatientData"
import styles from "./PatientRecordView.module.css"

export default function PatientRecordView({ userRole = "Clinician", demoMode = false }) {
  const navigate = useNavigate()
  const [patientId, setPatientId] = useState("")
  const [patientRecord, setPatientRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleViewRecord = async (e) => {
    e.preventDefault()
    setError("")
    setPatientRecord(null)
    setLoading(true)

    try {
      if (demoMode) {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockRecord = getMockPatientRecord(patientId)

        if (!mockRecord) {
          setError("Patient record not found. Try P001, P002, or P003")
          setLoading(false)
          return
        }

        setPatientRecord(mockRecord)
        setLoading(false)
        return
      }

      // Step 1: Verify access (following sequence diagram) - skipped in demo mode
      const accessResponse = await verifyAccess(userRole, patientId)

      if (!accessResponse.accessGranted) {
        setError("Access Denied: You do not have permission to view this patient's record")
        setLoading(false)
        return
      }

      // Step 2: Get patient record if access granted
      const recordResponse = await getPatientRecord(patientId)

      if (!recordResponse.success) {
        setError(recordResponse.message || "Patient record not found")
        setLoading(false)
        return
      }

      setPatientRecord(recordResponse.data)
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={demoMode ? styles["patient-record-demo"] : styles["patient-record-container"]}>
      <div className={styles["header-controls"]}>
        <button className={styles["back-btn"]} onClick={() => navigate("/dashboard")} title="Go back to dashboard">
          ← Back to Dashboard
        </button>
        {patientRecord && (userRole === "Clinician" || userRole === "Nurse") && (
          <button className={styles["update-patient-btn"]} onClick={() => {
            const pid = patientRecord.patientID || patientRecord.patientId || patientId
            navigate(`/update-patient/${pid}`)
          }} title="Update this patient's record">
            📝 Update Patient
          </button>
        )}
      </div>

      {demoMode && (
        <div className={styles["demo-banner"]}>
          <strong>Demo Mode:</strong> Using mock data. Try patient IDs: P001, P002, or P003
        </div>
      )}

      <h2>View Patient Record</h2>

      <form onSubmit={handleViewRecord} className={styles["search-form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="patientId">Patient ID</label>
          <input
            id="patientId"
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "View Record"}
        </button>
      </form>

      {error && (
        <div className={styles["error-message"]}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {patientRecord && (
        <div className={styles["patient-record"]}>

          <h3>Patient Information</h3>

          <section className={styles["record-section"]}>
            <h4>Demographics</h4>
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

          <section className={styles["record-section"]}>
            <h4>Medical History</h4>
            <div className={styles["history-content"]}>
              {patientRecord.medicalHistory && patientRecord.medicalHistory.length > 0 ? (
                <div className={styles["history-list"]}>
                  {patientRecord.medicalHistory.map((item, index) => (
                    <div key={index} className={styles["history-item"]}>
                      {typeof item === "string" ? (
                        <p>{item}</p>
                      ) : (
                        <>
                          <div className={styles["history-header"]}>
                            <strong>{item.condition}</strong>
                            <span className={`${styles["status-badge"]} ${styles[item.status?.toLowerCase()]}`}>{item.status}</span>
                          </div>
                          <div className={styles["history-details"]}>
                            <span>Diagnosed: {item.diagnosedDate}</span>
                            {item.notes && <p className={styles["notes"]}>{item.notes}</p>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No medical history recorded</p>
              )}
            </div>
          </section>

          <section className={styles["record-section"]}>
            <h4>Current Medications</h4>
            <div className={styles["medications-list"]}>
              {patientRecord.medications && patientRecord.medications.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Medication</th>
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
                        <td>{med.frequency}</td>
                        <td>{med.prescribedBy || "N/A"}</td>
                        <td>{med.prescribedDate || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No current medications</p>
              )}
            </div>
          </section>

          <section className={styles["record-section"]}>
            <h4>Test Results</h4>
            <div className={styles["test-results"]}>
              {patientRecord.testResults && patientRecord.testResults.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th>Date</th>
                      <th>Result</th>
                      <th>Status</th>
                      <th>Ordered By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientRecord.testResults.map((test, index) => (
                      <tr key={index}>
                        <td>{test.testName}</td>
                        <td>{test.date}</td>
                        <td>{test.result}</td>
                        <td className={`${styles[`status-${test.status?.toLowerCase()}`]}`}>{test.status}</td>
                        <td>{test.orderedBy || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No test results available</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
