// Service for patient record operations following UC2 sequence diagram

export async function verifyAccess(userRole, patientId) {
  try {
    const response = await fetch("http://localhost:8080/api/access/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userRole, patientId }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error verifying access:", error)
    return { accessGranted: false, message: "Unable to verify access" }
  }
}

export async function getPatientRecord(patientId) {
  try {
    const response = await fetch(`http://localhost:8080/api/patients/${patientId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, message: "Patient record not found" }
      }
      return { success: false, message: "Error retrieving patient record" }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching patient record:", error)
    return { success: false, message: "Unable to connect to server" }
  }
}
