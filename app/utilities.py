'''
Defines functions for preprocessing PDF text and handling text chunks
'''
import re
from typing import Any, List, Dict
import pymupdf4llm

chunk_size = 500


def clean_text(text: str) -> str:
    """
    Clean and normalize text by removing markdown formatting, HTML tags, and special characters.
    
    Args:
        text (str): The input text to clean
        
    Returns:
        str: Cleaned text with markdown, HTML, and special characters removed
        
    Examples:
        >>> clean_text("# Header\n**bold** [link](url)")
        'Header bold link'
    """
    # Remove markdown headers, bold, italic, code blocks
    text = re.sub(r'[#*_`]+', '', text)
    
    # Remove markdown links [text](url) -> text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    
    # Remove horizontal rules (---, ___, ***)
    text = re.sub(r'[-_*]{3,}', '', text)
    
    # Remove blockquotes
    text = re.sub(r'^\s*>\s*', '', text)
    
    # Remove HTML tags if any
    text = re.sub(r'<[^>]+>', '', text)
    
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^\w\s.,!?;:()-]', '', text)
    
    # Remove extra whitespace and normalize spaces
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()


def extractPdfText(path: str) -> str:
    """
    Extract text from a PDF file and clean it.
    
    Args:
        path (str): Path to the PDF file
        
    Returns:
        str: Extracted and cleaned text from the PDF
        
    Raises:
        FileNotFoundError: If the PDF file doesn't exist
        ValueError: If the file is not a valid PDF
    """
    pdf_file_text = pymupdf4llm.to_markdown(path)
    return clean_text(pdf_file_text)


def split_str_to_chunk_char(text: str, chunk_size: int = 500) -> List[str]:
    """
    Split a string into chunks of specified size.
    
    Args:
        text (str): The input text to split
        chunk_size (int, optional): Size of each chunk. Defaults to 500.
        
    Returns:
        List[str]: List of text chunks
        
    Examples:
        >>> split_str_to_chunk_char("Hello world", 5)
        ['Hello', ' worl', 'd']
    """
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]


def aggregatePdfFiles(pdf_dict: Dict[str, Dict[str, str]]) -> str:
    """
    Combine text content from multiple PDF files into a single string.
    
    Args:
        pdf_dict (Dict[str, Dict[str, str]]): Dictionary mapping PDF IDs to their content
            Format: {pdf_id: {'content': 'text content', ...}}
        
    Returns:
        str: Combined text from all PDFs
        
    Examples:
        >>> pdfs = {'1': {'content': 'Hello'}, '2': {'content': 'World'}}
        >>> aggregatePdfFiles(pdfs)
        'HelloWorld'
    """
    temp = ""
    for pdf_id, pdf_data in pdf_dict.items():
        temp += pdf_data['content']  # get the cleaned out str of a singular pdf
    return temp