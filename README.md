# Penguin Healthcare Application

A full-stack healthcare application with a Spring Boot backend and Next.js frontend.

## Architecture
- **Backend:** Spring Boot REST API (Java)
- **Frontend:** React

## Quick Start

### 1. Start the backend
./gradlew bootRun

### 2. Start the Frontend
\`\`\`bash
npm install
npm run start
\`\`\`
Frontend runs on **http://localhost:3000**



## Patient Demo Mode (No Backend Required) 

Test the patient record viewer immediately without setting up the backend:

1. Start the frontend: `npm start`
2. Visit **http://localhost:3000/patient-record-demo**
3. Try these patient IDs:
   - **P001** - John Doe (comprehensive medical history)
   - **P002** - Jane Smith (asthma and migraine)
   - **P003** - Robert Johnson (minimal history)

Demo mode uses mock data and bypasses authentication, frontend development and testing.

## Available Routes

- `/` - Login page (requires backend)
- `/patient-record` - Patient record viewer with authentication (requires backend)
- `/patient-record-demo` - Patient record viewer with mock data (no backend needed) - added for test purposes only

## Test Credentials
- **Admin:** username: `admin`, password: `12345`


### Implemented Use Cases
- **UC1:** User Authentication - Login with role-based access control
- **UC2:** View Patient Record - Retrieve and display patient medical records
  - Demographics, medical history, medications, and test results
  - Access control verification
  - Error handling for denied access or missing records

## Development Notes
- Backend must be running before frontend can authenticate users




