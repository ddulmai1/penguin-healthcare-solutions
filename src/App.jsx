import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRecordView from "./components/PatientRecordView";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path = "/login" element ={<LoginForm />}/>
      <Route path = "/patient-record-demo" element ={<PatientRecordView />}/>
      </Routes>

    </div>
    </Router>
  );
}

export default App;
