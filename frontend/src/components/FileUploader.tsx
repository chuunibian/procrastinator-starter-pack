import { ChangeEvent, useState } from "react"
import Button from "./Button";
import SelectedFiles from "./SelectedFiles";

interface Props{
    onResponseReceived: (data: any) => void;

}

interface FileResult {
    pdf_id: string;
    filename: string;
    status: 'success' | 'error';
    message: string;
}

interface GeminiResponse {
    total_files: number;
    processed_files: FileResult[];
    aggregated_response: string;
    gemini_response: string;
}

function FileUploader(prop: Props){
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFileState, setSelectedFileState] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
        setSelectedFileState(1);
    }

    const handleUpload = async () => {
        setUploadStatus('loading');
        const formData = new FormData(); // Needed for multipartform data
        files.forEach(file => {
          formData.append('files', file);
        });
        try {
            const response = await fetch('http://127.0.0.1:8000/upload_pdfs', {
                method: 'POST',
                body: formData,
            });

            const response_data: GeminiResponse = await response.json();

            setUploadStatus('success');

            prop.onResponseReceived(response_data) // Set call back this will call a usestate local to parent and set the data to something
        } catch (error) {
            console.log("Error while uploading files")
        }
    }

    return(
        <div className="flex flex-col w-full max-w-2xl mx-auto px-2 py-3 gap-4">        
            <label className="w-full">
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-500 rounded-lg cursor-pointer bg-indigo-500 hover:bg-indigo-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-white">PDF files only</p>
                    </div>
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".pdf"
                    />
                </div>
            </label>
            <Button type="submit" disabled={uploadStatus === 'loading' || files.length === 0} onClick={handleUpload}>Submit</Button>
            {selectedFileState === 1 && <SelectedFiles files={files}/>}
        </div>
    )
}

export default FileUploader

// Notes:
// disabled set to those useState cond and those are persistent