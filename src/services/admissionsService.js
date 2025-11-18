// Service for admission/discharge/transfer (ADT) message operations - UC-4

/**
 * Submit an ADT (Admission/Discharge/Transfer) message to the system
 * Matches backend endpoint: POST /api/admission/createAdmission
 * @param {Object} adtMessage - The ADT message containing patientId, admissionType, timestamp, etc.
 * @returns {Object} Response with success status and confirmation details
 */
export async function submitADTMessage(adtMessage) {
  try {
    const response = await fetch("http://localhost:8080/api/admission/createAdmission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adtMessage),
    })

    if (!response.ok) {
      const text = await response.text()
      return { success: false, message: `Server error: ${response.status} ${text}` }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error submitting ADT message:", error)
    return { success: false, message: "Unable to connect to server" }
  }
}

/**
 * Get all admission records for display in dashboard
 * @returns {Object} Response with list of admission records
 */
export async function getAdmissionRecords() {
  try {
    const response = await fetch("http://localhost:8080/api/admission/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, message: "Admission records endpoint not yet available" }
      }
      return { success: false, message: "Error retrieving admission records" }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching admission records:", error)
    return { success: false, message: "Unable to connect to server" }
  }
}

/**
 * Get admission details for a specific patient
 * @param {string|number} patientId - The patient ID
 * @returns {Object} Response with patient admission history
 */
export async function getPatientAdmissions(patientId) {
  try {
    // Convert string ID format (P001, 001, etc) to numeric ID (1, 2, ...)
    const numericId = String(patientId).replace(/\D/g, '') || patientId

    const response = await fetch(`http://localhost:8080/api/admission/patient/${numericId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, message: "No admission records found for this patient" }
      }
      return { success: false, message: "Error retrieving patient admissions" }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching patient admissions:", error)
    return { success: false, message: "Unable to connect to server" }
  }
}
