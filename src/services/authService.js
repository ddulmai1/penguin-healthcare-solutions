export async function authenticateUser(username, password) {
  try {
    const response = await fetch("http://localhost:3000/api/operators/username/Admin/password/12345", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ username, password }),
    });

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return { success: false, message: "Unable to connect to server" };
  }
}
