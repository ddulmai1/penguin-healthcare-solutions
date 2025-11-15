import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PatientRecordView from "./components/PatientRecordView";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/dashboard";
import PatientPortal from "./components/PatientPortal";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patient-portal" element={<PatientPortal />} />
      <Route path="/patient-record-demo" element={<PatientRecordView demoMode={true} />} />
      <Route path="/patient-record" element={<PatientRecordView demoMode={false} />} />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
