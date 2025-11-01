"use client"

import { useState } from "react"
import { authenticateUser } from "../services/authService"
import styles from "./LoginForm.module.css"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("Authenticating...")

    try {
      const response = await authenticateUser(username, password)
      if (response.success) {
        setMessage(`Welcome ${response.role}! Redirecting to dashboard...`)
      } else {
        setMessage("Invalid username or password")
      }
    } catch (error) {
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
