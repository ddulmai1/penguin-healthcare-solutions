// Service for admission/discharge/transfer (ADT) message operations - UC-4

const API_BASE = process.env.REACT_APP_API_BASE_URL || ""

/**
 * Submit an ADT (Admission/Discharge/Transfer) message to the system
 * @param {Object} adtMessage - The ADT message containing patientId, admissionType, timestamp, etc.
 * @returns {Object} Response with success status and confirmation details
 */
export async function submitADTMessage(adtMessage) {
  try {
    const response = await fetch(`${API_BASE}/api/admissions/adt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adtMessage),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return { 
        success: false, 
        message: `Failed to process ADT message: ${response.status} - ${errorText}` 
      }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error submitting ADT message:", error)
    return { 
      success: false, 
      message: "Unable to connect to admissions system. Is the backend running?" 
    }
  }
}

/**
 * Get all admission records for display in dashboard
 * @returns {Object} Response with list of admission records
 */
export async function getAdmissionRecords() {
  try {
    const response = await fetch(`${API_BASE}/api/admissions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      return { success: false, message: "Failed to retrieve admission records" }
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
    const response = await fetch(`${API_BASE}/api/admissions/patient/${patientId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, message: "No admission records found for this patient" }
      }
      return { success: false, message: "Failed to retrieve patient admissions" }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching patient admissions:", error)
    return { success: false, message: "Unable to connect to server" }
  }
}
