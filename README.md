# Penguin Healthcare Solutions

A full-stack healthcare application with a Spring Boot backend and a React frontend.

## Code Documentation
- Entire codebase is included in this repository under `src/` and `bin/`.
- A setup script is provided to install required packages: `bin/setup.sh`.

## Architecture
- Backend: Spring Boot REST API (Java)
- Frontend: React

## Prerequisites (macOS)
- Java JDK 17+ (OpenJDK recommended)
- Gradle Wrapper (already included as `gradlew`)
- Node.js 18+ and npm

### Optional installers (Homebrew)
```bash
brew install openjdk@17
brew install node
```

## Install Steps (one-time)
```bash
chmod +x bin/setup.sh
./bin/setup.sh
```
The script verifies Java/Gradle and installs frontend dependencies via npm.

## Run the System
### 1) Start the Backend (Spring Boot)
```bash
./gradlew bootRun
```
Backend runs at `http://localhost:8080`.

### 2) Start the Frontend (React)
```bash
npm install   # or npm ci
npm run start
```
Frontend runs at `http://localhost:3000`.

### Optional: AI Diagnosis Shortcut
- Set an environment variable to enable the dashboard button to open your Gradio app in a new tab:
```bash
echo "REACT_APP_AI_DIAGNOSIS_URL=https://your-gradio-app.example.com" > .env
```
- Restart the frontend dev server after adding/updating `.env`.

### Connecting Frontend to Server
- The frontend services call the backend under `http://localhost:8080` (see `src/services/*.js`).
- Ensure the backend is started before logging in or using non-demo pages.

## Setup on Windows and Linux

### Windows (PowerShell)
- Install JDK 17+:
  - Download Temurin (Adoptium) or Oracle JDK and add `JAVA_HOME`/PATH.
- Install Node.js 18+ from nodejs.org.
- Verify tools:
```powershell
java -version
node -v
npm -v
```
- Install frontend deps and run:
```powershell
npm ci  # or npm install
npm run start
```
- Run backend:
```powershell
./gradlew.bat bootRun
```

### Linux (bash)
- Install JDK 17+ and Node.js via your distro:
```bash
sudo apt update && sudo apt install -y openjdk-17-jdk nodejs npm   # Debian/Ubuntu
# or
sudo dnf install -y java-17-openjdk nodejs npm                     # Fedora
```
- Verify tools:
```bash
java -version
node -v
npm -v
```
- Install deps and run:
```bash
npm ci  # or npm install
npm run start
```
- Run backend:
```bash
./gradlew bootRun
```

Notes:
- Use `gradlew.bat` on Windows and `./gradlew` on macOS/Linux.
- If ports conflict, change frontend port via `PORT=3001 npm start` and update service URLs.



## Patient Demo Mode (No Backend Required) 

Test the patient record viewer without setting up the backend:

1. Start the frontend: `npm start`
2. Visit **http://localhost:3000/patient-record-demo**
3. Try these patient IDs:
   - **P001** - John Doe (comprehensive medical history)
   - **P002** - Jane Smith (asthma and migraine)
   - **P003** - Robert Johnson (minimal history)

Demo mode uses mock data and bypasses authentication for fast frontend development and testing.

## Available Routes

- `/` - Login page (requires backend)
- `/patient-record` - Patient record viewer with authentication (requires backend)
- `/patient-record-demo` - Patient record viewer with mock data (no backend needed) - added for test purposes only
- `/admissions` - ADT submission (requires backend)
- `/admissions-demo` -ADT submission (no backend required) - added for test purpose only
- `/update-patient` - update patient medical information (requires backend)
- `/update-patient-demo/P001` (P002, P003) - update patient information (no backend required) - for test only
- `/dashboard` - dashboard for easy navigation

## Test Credentials
- **Admin:** username: `admin`, password: `12345`
- **Clinician:** username: `Rita`, password: `pass`


### Implemented Use Cases
- **UC1:** User Authentication - Login with role-based access control
- **UC2:** View Patient Record - Retrieve and display patient medical records
  - Demographics, medical history, medications, and test results
  - Access control verification
  - Error handling for denied access or missing records
- **UC3:** Update Patient Record
- **UC4:** Admission notifications 

## Development Notes
- Backend must be running before frontend can authenticate users.
- For production, configure CORS and provider secrets in `application.properties`.




