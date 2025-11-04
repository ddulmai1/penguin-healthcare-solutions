import React from "react";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path = "/" element ={<LoginForm />}/>
      <Route path = "/" element ={<PatientRecordController />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
