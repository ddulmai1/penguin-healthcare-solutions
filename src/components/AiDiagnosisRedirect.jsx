import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

export default function AiDiagnosisRedirect() {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_AI_DIAGNOSIS_URL;

  useEffect(() => {
    if (url && typeof url === "string" && url.trim().length > 0) {
      // Hard redirect in the same tab
      window.location.replace(url);
    }
  }, [url]);

  if (!url || url.trim().length === 0) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>AI Diagnosis</h1>
          </div>
        </header>
        <main className={styles.content}>
          <div className={styles.card} style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Configuration Required</h2>
            <p style={{ marginBottom: "1rem", lineHeight: 1.5 }}>
              The AI diagnosis URL is not configured. Please set the environment variable
              <code style={{ marginLeft: 4, marginRight: 4 }}>REACT_APP_AI_DIAGNOSIS_URL</code>
              to your Gradio link and restart the development server.
            </p>
            <ul style={{ textAlign: "left", margin: "0 0 1rem 1rem", lineHeight: 1.5 }}>
              <li>
                Create a <code>.env</code> file in the project root with:
              </li>
            </ul>
            <pre
              style={{
                textAlign: "left",
                background: "#0b1020",
                color: "#e6e6e6",
                padding: "0.75rem",
                borderRadius: 8,
                overflowX: "auto",
                marginBottom: "1rem",
              }}
            >{`REACT_APP_AI_DIAGNOSIS_URL=https://your-gradio-app.example.com`}</pre>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className={styles.card} onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Brief fallback UI in case redirect is delayed
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Redirecting to AI Diagnosis…</h1>
        </div>
      </header>
      <main className={styles.content}>
        <div className={styles.card} style={{ maxWidth: 600, margin: "0 auto" }}>
          <p>If you are not redirected automatically, click the button below.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
            <a className={styles.card} href={url} target="_blank" rel="noopener noreferrer">Open AI Diagnosis</a>
            <button className={styles.card} onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
          </div>
        </div>
      </main>
    </div>
  );
}
