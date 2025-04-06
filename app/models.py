from pydantic import BaseModel
from typing import List, Dict, Any

class GeminiRequest(BaseModel):
    prompt: str
    max_tokens: int


class FileResult(BaseModel):
    pdf_id: str
    filename: str
    status: str
    message: str


class GeminiResponse(BaseModel):
    total_files: int
    processed_files: List[FileResult]
    aggregated_response: str
    gemini_response: List[str]


class DebugInternal(BaseModel):
    processed_file_size: int
    
