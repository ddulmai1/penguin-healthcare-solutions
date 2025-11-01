# Penguin Healthcare Application

A full-stack healthcare application with a Spring Boot backend and Next.js frontend.

## Architecture
- **Backend:** Spring Boot REST API (Java)
- **Frontend:** React

## Quick Start

### 1. Navigate to Frontend Directory
\`\`\`bash
cd Frontend
\`\`\`

### 2. Start the Frontend
\`\`\`bash
npm install
npm start
\`\`\`
Frontend runs on **http://localhost:3000**

server runs on **http://localhost:8080**


## Demo Mode (No Backend Required) - doesn't work right now

Test the patient record viewer immediately without setting up the backend:

1. Start the frontend: `npm start`
2. Visit **http://localhost:3000/patient-record-demo**
3. Try these patient IDs:
   - **P001** - John Doe (comprehensive medical history)
   - **P002** - Jane Smith (asthma and migraine)
   - **P003** - Robert Johnson (minimal history)

Demo mode uses mock data and bypasses authentication, perfect for frontend development and testing.

## Available Routes

- `/` - Login page (requires backend)
- `/patient-record` - Patient record viewer with authentication (requires backend)
- `/patient-record-demo` - Patient record viewer with mock data (no backend needed) - added for test purposes but really doesnt work

## Test Credentials
- **Admin:** username: `admin`, password: `12345`
- **User:** username: `john`, password: `pass`

## Project Structure
\`\`\`
PenguinHealthcare/
├── Backend/                 # Spring Boot REST API
│   ├── src/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── model/          # Data models
│   │   └── dto/            # Data transfer objects
│   └── pom.xml
├── Frontend/               # Original React components
│   └── src/
│   |    ├── components/     # React components
│   |    ├── services/       # API services
│   |    └── data/           # Mock data for demo mode
    |---App.jsx
\`\`\`

## Features

### Implemented Use Cases
- **UC1:** User Authentication - Login with role-based access control
- **UC2:** View Patient Record - Retrieve and display patient medical records
  - Demographics, medical history, medications, and test results
  - Access control verification
  - Error handling for denied access or missing records

## Development Notes
- Backend must be running before frontend can authenticate users


## Current issues
- not able to test the login and patient record page because the backend won't communicate with the front end
- tried testing patient record page by creating a demo but it doesnt work, keeps going back to the login page


