export async function authenticateUser(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/operators/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return { success: false, message: "Unable to connect to server" };
  }
}
