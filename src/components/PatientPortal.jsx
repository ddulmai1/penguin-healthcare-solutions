"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./PatientPortal.module.css"

export default function PatientPortal() {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const storedUser = localStorage.getItem("user")
		const storedUserType = localStorage.getItem("userType")

		// If there is no user or the stored userType is not patient, redirect to login
		if (!storedUser || storedUserType !== "patient") {
			navigate("/login")
			return
		}

		try {
			setUser(JSON.parse(storedUser))
		} catch (e) {
			console.error("Failed to parse stored user:", e)
			localStorage.removeItem("user")
			navigate("/login")
			return
		} finally {
			setLoading(false)
		}
	}, [navigate])

	const handleLogout = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("userRole")
		localStorage.removeItem("userType")
		localStorage.removeItem("token")
		navigate("/login")
	}

	const goToMyRecord = () => {
		// go to demo view of patient record; in a real app we'd fetch patient id and route accordingly
		navigate("/patient-record-demo")
	}

	if (loading) return <div className={styles.loading}>Loading...</div>

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerLeft}>
					<h1 className={styles.title}>Patient Portal</h1>
					<div className={styles.welcome}>Welcome, {user?.firstName || user?.username || "Patient"}</div>
				</div>
				<div className={styles.headerRight}>
					<button className={styles.btn} onClick={handleLogout}>Logout</button>
				</div>
			</header>

			<main className={styles.main}>
				<section className={styles.cardRow}>
					<div className={styles.card}>
						<h3>My Medical Records</h3>
						<p>View your latest medical records, test results, and prescriptions.</p>
						<button className={styles.cardBtn} onClick={goToMyRecord}>View Records</button>
					</div>

					<div className={styles.card}>
						<h3>Appointments</h3>
						<p>Schedule or review upcoming appointments.</p>
						<button className={styles.cardBtn} onClick={() => alert('Appointments coming soon')}>Manage</button>
					</div>

					<div className={styles.card}>
						<h3>Prescriptions</h3>
						<p>View active prescriptions and request refills.</p>
						<button className={styles.cardBtn} onClick={() => alert('Prescriptions coming soon')}>View</button>
					</div>
				</section>

				<section className={styles.infoSection}>
					<h2>Your Information</h2>
					<div className={styles.infoGrid}>
						<div>
							<strong>Name</strong>
							<div>{user?.firstName} {user?.lastName}</div>
						</div>
						<div>
							<strong>Username</strong>
							<div>{user?.username}</div>
						</div>
						<div>
							<strong>Notes</strong>
							<div>{user?.notes || 'N/A'}</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}