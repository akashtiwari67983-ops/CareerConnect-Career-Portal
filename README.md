# 🚀 CareerConnect - Premium Job Portal Platform

Welcome to **CareerConnect**, a modern, responsive, and fully-featured Job Portal web application. It includes a beautiful User Interface for job seekers and a powerful, isolated Admin Dashboard to manage users, jobs, and applications efficiently.

---

## 👨‍💻 Developed By

**Prathamesh Giri**
- **Website:** [prathameshgiri.in](https://prathameshgiri.in/)
- **Build Portfolio:** [build.prathameshgiri.in](https://build.prathameshgiri.in/)

## 🛠️ Tech Stack
- **Frontend:** HTML5, Premium CSS (Glassmorphism & Gradients), Vanilla JavaScript
- **Backend:** Node.js, Express.js (REST API Endpoints)
- **Database:** Local JSON (`db.json`)
- **Design Assets:** FontAwesome Icons, Google Fonts (Outfit)

---

## ⚙️ How to Run Locally

Follow these precise steps to start the application:

1. **Install Node.js:** 
   Ensure you have Node.js installed on your machine.
   
2. **Open Terminal/Command Prompt:**
   Navigate to the root directory of this project.

3. **Install Dependencies:**
   Run the following command to install the required packages (`express`, `body-parser`, `cors`):
   ```bash
   npm install
   ```

4. **Start the Server:**
   Execute this command to launch both servers simultaneously:
   ```bash
   node server.js
   ```

5. **Access the Portals:**
   - 🌐 User Portal: Open your browser and go to `http://localhost:3000`
   - 🛡️ Admin Dashboard: Open your browser and go to `http://localhost:3001`

---

## 🔐 Login Credentials

*Note: For convenience, both login pages feature an **Autofill Demo Credentials** button to instantly put in the respective logins.*

#### 🧑‍💼 User / Candidate Portal
Use these test details to log in as a regular job applicant.
- **Url:** `http://localhost:3000`
- **Username:** `user`
- **Password:** `password`

#### 🛡️ System Admin
Use these test details to access the exclusive SpaceAdmin interface.
- **Url:** `http://localhost:3001`
- **Username:** `admin`
- **Password:** `password`

---

## ✨ Features Highlight
- **Strictly Isolated Network:** The User interface and Admin dashboard are decoupled into their very own respective web ports. Let's keep the system heavily secured.
- **Luxury UI/UX Layout:** Complete deep dark themes, glassmorphism filters, particle animations, gradient-based texts, and fluid micro-interactions logic built natively!
- **Persistent Data:** Real-world testing. Anything created, requested or deleted gets dynamically pushed and registered into `db.json` making state management simple out of the box.
- **Job Applications Management:** Live mapping of incoming user applications to the system admin's dashboard.
