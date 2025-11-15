"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./dashboard.module.css"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [showPatientIdPrompt, setShowPatientIdPrompt] = useState(false)
  const [patientIdInput, setPatientIdInput] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user")
    const storedRole = localStorage.getItem("userRole")

    if (!storedUser || !storedRole) {
      // Redirect to login if no user data found
      navigate("/login")
      return
    }

    setUser(JSON.parse(storedUser))
    setUserRole(storedRole)
  }, [navigate])

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const handleViewPatientRecord = () => {
    navigate("/patient-record")
  }

  const handleViewPatientRecordDemo = () => {
    navigate("/patient-record-demo")
  }

  const handleUpdatePatientClick = () => {
    setShowPatientIdPrompt(true)
  }

  const handlePatientIdSubmit = (e) => {
    e.preventDefault()
    if (patientIdInput.trim()) {
      navigate(`/update-patient/${patientIdInput.trim()}`)
      setShowPatientIdPrompt(false)
      setPatientIdInput("")
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Penguin Healthcare Dashboard</h1>
          <div className={styles.userInfo}>
            <span>Welcome, {user.username || "User"}</span>
            <span className={styles.userRole}>{userRole}</span>
          </div>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </header>

      <main className={styles.content}>
        <div className={styles.grid}>
          <button 
            onClick={handleViewPatientRecord} 
            className={styles.card}
          >
            View Patient Records
          </button>
          <button 
            onClick={handleViewPatientRecordDemo} 
            className={styles.card}
          >
            Demo Mode
          </button>
          <button className={styles.card} onClick={handleUpdatePatientClick}>Update Patient</button>
          <button className={styles.card}>Admissions</button>
          <button className={styles.card}>Appointments</button>
          <button className={styles.card}>Prescription</button>
          <button className={styles.card}>AI‑Assisted Diagnosis</button>
        </div>
        {showPatientIdPrompt && (
          <div className={styles.patientIdPromptOverlay}>
            <form className={styles.patientIdPromptForm} onSubmit={handlePatientIdSubmit}>
              <label htmlFor="patientIdInput">Enter Patient ID:</label>
              <input
                id="patientIdInput"
                type="text"
                value={patientIdInput}
                onChange={e => setPatientIdInput(e.target.value)}
                className={styles.patientIdInput}
                autoFocus
              />
              <div className={styles.promptButtons}>
                <button type="submit" className={styles.confirmButton}>Confirm</button>
                <button type="button" className={styles.cancelButton} onClick={() => setShowPatientIdPrompt(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}