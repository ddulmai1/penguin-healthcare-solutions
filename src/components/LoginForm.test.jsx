import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import LoginForm from "./LoginForm"
import { authenticateUser } from "../services/authService"

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
...jest.requireActual("react-router-dom"),
useNavigate: () => mockNavigate,
}))

// Mock the authenticateUser service
jest.mock("../services/authService")

// Mock localStorage
beforeEach(() => {
Storage.prototype.setItem = jest.fn()
mockNavigate.mockReset()
})

describe("LoginForm component", () => {
test("renders login form fields", () => {
render(<LoginForm />)
expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
expect(screen.getByText("Login")).toBeInTheDocument()
})

test("shows 'Authenticating...' while processing login", async () => {
authenticateUser.mockResolvedValue({ success: true, role: "admin" })

render(<LoginForm />)

fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } })
fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret" } })

fireEvent.click(screen.getByText("Login"))

expect(screen.getByText("Authenticating...")).toBeInTheDocument()

})

test("successful login stores data and navigates to dashboard", async () => {
authenticateUser.mockResolvedValue({
success: true,
role: "admin",
token: "123",
})

render(<LoginForm />)

fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } })
fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret" } })

fireEvent.click(screen.getByText("Login"))

await waitFor(() => {
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "user",
    JSON.stringify({ success: true, role: "admin", token: "123" })
  )
})

expect(localStorage.setItem).toHaveBeenCalledWith("userRole", "admin")
expect(mockNavigate).toHaveBeenCalledWith("/dashboard")

})

test("shows server error message on failed authentication", async () => {
authenticateUser.mockResolvedValue({
success: false,
message: "Invalid credentials",
})

render(<LoginForm />)

fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "wrong" } })
fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "badpass" } })

fireEvent.click(screen.getByText("Login"))

await waitFor(() => {
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
})

})

test("shows network error when authenticateUser throws", async () => {
authenticateUser.mockRejectedValue(new Error("network failure"))

render(<LoginForm />)

fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } })
fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret" } })

fireEvent.click(screen.getByText("Login"))

await waitFor(() => {
  expect(screen.getByText("Error connecting to server")).toBeInTheDocument()
})

})
})
