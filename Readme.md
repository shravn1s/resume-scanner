# 📄 Resume Scanner & Matcher

An AI-powered web application that helps recruiters and job seekers compare resumes against job descriptions. Built using **React (frontend)**, **FastAPI (backend)**, and **MySQL (database)**, the system uses **TF-IDF** and **cosine similarity** to calculate match scores for up to 4 uploaded resumes.

---

## 🚀 Features

- ✅ User signup and login with secure password hashing
- 📤 Upload multiple resumes (PDFs only, up to 4)
- 📋 Paste or type a job description
- 📊 Get individual match scores per resume
- 🔘 Beautiful radial progress bars for visual feedback

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- TailwindCSS
- Framer Motion (for animations)
- Axios (for API calls)

### Backend:
- FastAPI (Python)
- MySQL
- PyMuPDF (for PDF text extraction)
- scikit-learn (TF-IDF & cosine similarity)

---

## 🧪 Sample Job Descriptions

### 🔧 Full Stack Developer

> We are seeking a skilled and motivated Full Stack Developer to join our team. The ideal candidate should have experience in building scalable web applications using Python, HTML, CSS, SQL, and JavaScript.
>
> **Skills:** Python, Django/Flask, SQL, HTML5, CSS3, JavaScript, Git

---

### 📊 Data Analyst

> We are looking for a Data Analyst who is passionate about deriving insights from data. You’ll be responsible for analyzing trends and building dashboards.
>
> **Skills:** Python, SQL, Pandas, Excel, Power BI/Tableau, Statistics

---

### 🌐 Frontend Developer

> Join our dynamic team as a Frontend Developer! You'll work on building interactive UIs with modern JavaScript frameworks.
>
> **Skills:** HTML, CSS, JavaScript, React.js, Tailwind, Git

---

## 🔧 Installation & Setup

cd resume-scanner

backend:
cd backend
pip install -r requirements.txt
pip install fastapi uvicorn python-multipart pymupdf scikit-learn mysql-connector-python
uvicorn app.main:app --reload

frontend:
cd frontend
npm install
npm run dev
Access at: http://localhost:5173

SQL:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

resume-scanner/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── users_db.py
│   │   └── resume_parser.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ResumeMatcher.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ChooseAuth.jsx
│   │   └── App.jsx
│   └── tailwind.config.js
│
└── README.md
