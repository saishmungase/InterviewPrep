# InterviewPrep

A project that uses AI to generate interview questions tailored to the user's preparations.

---

## Prerequisites

Before running the project locally, ensure you have the following software installed:

- **Node.js** (LTS version recommended): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)

---

## Clone the Repository

Start by cloning the repository to your local machine using Git:

$ git clone https://github.com/saishmungase/InterviewPrep.git

Navigate into the project directory:

$ cd InterviewPrep

---

## Setting Up the Project

### 1. Add Data to `.env` File

Create a `.env` file in the root directory (if it's not already there). Add the necessary configuration data, such as API keys, database credentials, etc. Here's an example:

DATABASE_URL=your_database_url 
AI_KEY=your_api_key

Make sure to replace the placeholders with your actual values.

### 2. Install Frontend Dependencies

Open a terminal in the root directory of the project and run the following command to install the frontend dependencies:

$ npm install

After the installation is complete, start the frontend development server:

$ npm run dev

The application will be running at `http://localhost:3000`. Keep this terminal open as it will be running the frontend server.

### 3. Install Backend Dependencies

Open another terminal window and navigate to the `backend` folder:

$ cd backend

Then, install the backend dependencies:

$ npm install

After that, start the backend server by running:

$ node index.js

Your backend will now be running, and both the frontend and backend will be ready for development.

---

## Accessing the Application

- Frontend: [http://localhost:3000](http://localhost:3000)
