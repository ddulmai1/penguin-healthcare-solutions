"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./dashboard.module.css"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
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
          <button className={styles.card}>Update Patient</button>
          <button className={styles.card}>Appointments</button>
          <button className={styles.card}>Prescription</button>
          <button className={styles.card}>AI‑Assisted Diagnosis</button>
        </div>
      </main>
    </div>
  )
}