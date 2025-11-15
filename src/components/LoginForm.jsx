"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authenticateUser } from "../services/authService"
import styles from "./LoginForm.module.css"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("Authenticating...")

    try {
      const response = await authenticateUser(username, password)
      if (response.success) {
        // store minimal session info
        localStorage.setItem("user", JSON.stringify(response))
        localStorage.setItem("userRole", response.role)

        // navigate to dashboard
        navigate("/dashboard")
      } else {
        setMessage(response.message || "Invalid username or password")
      }
    } catch (err) {
      setMessage("Error connecting to server")
    }
  }
  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["branding"]}>
        <h1>Penguin Healthcare</h1>
      </div>

      <div className={styles["login-container"]}>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
        <div className={styles["register-link-container"]}>
          <a href="/register" className={styles["register-link"]}>
            Register
          </a>
        </div>
      </div>
    </div>
  )
}
