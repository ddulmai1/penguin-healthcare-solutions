import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import PatientPortal from "./PatientPortal"
import { useNavigate } from "react-router-dom"

const mockNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

describe("PatientPortal", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    Storage.prototype.getItem = jest.fn()
    Storage.prototype.removeItem = jest.fn()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  it("redirects to login when no stored user", async () => {
    localStorage.getItem.mockImplementation((key) => null)
    render(<PatientPortal />)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login")
    })
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("renders patient info when authenticated patient", async () => {
    const user = { firstName: "Jane", lastName: "Smith", username: "jane", notes: "N" }
    localStorage.getItem.mockImplementation((key) => (key === "user" ? JSON.stringify(user) : key === "userType" ? "patient" : null))
    render(<PatientPortal />)
    await waitFor(() => {
      expect(screen.getByText("Patient Portal")).toBeInTheDocument()
    })
    expect(screen.getByText(/Welcome, Jane/)).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalledWith("/login")
  })

  it("handles invalid stored user JSON and navigates to login", async () => {
    localStorage.getItem.mockImplementation((key) => (key === "user" ? "{" : key === "userType" ? "patient" : null))
    render(<PatientPortal />)
    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith("user")
      expect(mockNavigate).toHaveBeenCalledWith("/login")
    })
  })

  it("logout clears storage and navigates to login", async () => {
    const user = { firstName: "John", lastName: "Doe", username: "john" }
    localStorage.getItem.mockImplementation((key) => (key === "user" ? JSON.stringify(user) : key === "userType" ? "patient" : null))
    render(<PatientPortal />)
    await waitFor(() => screen.getByText("Patient Portal"))
    fireEvent.click(screen.getByText("Logout"))
    expect(localStorage.removeItem).toHaveBeenCalledWith("user")
    expect(localStorage.removeItem).toHaveBeenCalledWith("userRole")
    expect(localStorage.removeItem).toHaveBeenCalledWith("userType")
    expect(localStorage.removeItem).toHaveBeenCalledWith("token")
    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })

  it("navigates to patient record demo", async () => {
    const user = { firstName: "John", lastName: "Doe", username: "john" }
    localStorage.getItem.mockImplementation((key) => (key === "user" ? JSON.stringify(user) : key === "userType" ? "patient" : null))
    render(<PatientPortal />)
    await waitFor(() => screen.getByText("Patient Portal"))
    fireEvent.click(screen.getByText("View Records"))
    expect(mockNavigate).toHaveBeenCalledWith("/patient-record-demo")
  })
})
