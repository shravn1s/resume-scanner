# backend/app/main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from .resume_parser import extract_text_from_pdf
from .users_db import add_user, validate_user
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import shutil

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/signup")
def signup(username: str = Form(...), password: str = Form(...)):
    if add_user(username, password):
        return {"success": True, "message": "Account created"}
    else:
        return {"success": False, "message": "Username already exists"}


@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    if validate_user(username, password):
        return {"success": True, "message": "Login successful"}
    else:
        return {"success": False, "message": "Invalid credentials"}


@app.post("/match")
async def match_resumes(job_description: str = Form(...), files: list[UploadFile] = File(...)):
    if len(files) > 4:
        return {"error": "You can only upload up to 4 resumes"}

    job_text = job_description.strip()
    scores = []

    for file in files:
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        try:
            resume_text = extract_text_from_pdf(file_path).strip()

            # Edge case: If resume has no text
            if not resume_text:
                score = 0.0
            else:
                vectorizer = TfidfVectorizer()
                vectors = vectorizer.fit_transform([job_text, resume_text])
                score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0] * 100

            scores.append({
                "filename": file.filename,
                "match_score": round(score, 2)
            })

        except Exception as e:
            scores.append({
                "filename": file.filename,
                "match_score": 0,
                "error": str(e)
            })
        finally:
            os.remove(file_path)

    return {"results": scores}
