export interface FileResult {
    pdf_id: string;
    filename: string;
    status: 'success' | 'error';
    message: string;
}

export interface GeminiResponse {
    total_files: number;
    processed_files: FileResult[];
    aggregated_response: string;
    gemini_response: string[];
} 