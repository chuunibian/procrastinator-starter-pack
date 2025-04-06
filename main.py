from fastapi import FastAPI, File, UploadFile, HTTPException
import tempfile
import uuid
from fastapi.responses import JSONResponse
from app.utilities import extractPdfText, split_str_to_chunk_char, aggregatePdfFiles
import os
from typing import List
import google.generativeai as genAI
from dotenv import load_dotenv
from app.models import GeminiResponse, FileResult, DebugInternal

load_dotenv() # Get all env var from .env

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genAI.configure(api_key=GOOGLE_API_KEY)
model = genAI.GenerativeModel('gemini-2.0-flash')

processed_pdf = {}

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "HI"}

# Supposed to accept multiple files
@app.post("/upload_pdfs", response_model=GeminiResponse)
async def upload_pdfs(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        pdf_id = str(uuid.uuid4())
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
                content = await file.read()
                temp_pdf.write(content)
                temp_pdf_file_path = temp_pdf.name

            results_text = extractPdfText(temp_pdf_file_path)

            # Adding to in memory store (possibly move to a db later)
            processed_pdf[pdf_id] = {
                'filename': file.filename,
                'content': results_text
            }

            os.unlink(temp_pdf_file_path)

            results.append({
                'pdf_id': pdf_id,
                'filename': file.filename,
                'status': 'success',
                'message': 'PDF processed successfully'
            })

        except Exception as e:
            results.append({
                'pdf_id': pdf_id,
                'filename': file.filename,
                'status': 'error',
                'message': str(e)
            })


    # For each pdf in dictionary aggregate the string
    gemini_input = aggregatePdfFiles(processed_pdf)


    prompt = f"Analyze these lecture materials and provide some topics or keywords that are most likely on the exam but only provide 10 words not long paragraphs: {gemini_input}"

    # Later learn how to do try catch stuff and add httpexception stuff
    # TODO This is not async
    response = model.generate_content(prompt)

    return GeminiResponse(
        total_files=len(files),
        processed_files=results,
        aggregated_response=gemini_input,
        gemini_response=response.text
    )


@app.get("/current")
def current():
    return DebugInternal(processed_file_size=len(processed_pdf))


@app.post("/upload_pdfs/selfLLM")
def upload_pdf_selfllm():
    return {'response':'hello'}