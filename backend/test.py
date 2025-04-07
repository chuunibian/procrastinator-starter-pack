import pymupdf4llm
from pathlib import Path
import re
import transformers
from transformers import pipeline
from keybert import KeyBERT

kw_model = KeyBERT()

pdf_file_path = Path(__file__).parent / "testpdf" / "test.pdf"

pdf_file = pymupdf4llm.to_markdown(pdf_file_path)

def clean_text(text):
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

list_of_parsed_lines = []
cleaned_full_text = ""
lines = pdf_file.split("\n")

cleaned_full_text = clean_text(pdf_file) # clean full text

with open("full string.txt", 'w') as f:
    f.write(cleaned_full_text)

for line in lines:
    cleaned_line = clean_text(line)
    if cleaned_line:  # Only add non-empty lines
        list_of_parsed_lines.append(cleaned_line)

with open("cleaned_text.txt", "w", encoding='utf-8') as f:
    f.write("\n".join(list_of_parsed_lines))

# Original markdown is still saved if needed
with open("test.md", "w", encoding='utf-8') as f:
    f.write(pdf_file)


def split_str_to_chunk_char(text, chunk_size):
    return [text[i:i+chunk_size] for i in range(0,len(text), chunck_size)]

chunck_size = 5000
total_length = len(cleaned_full_text)

list_chunked_str = split_str_to_chunk_char(cleaned_full_text, chunck_size)

# print(list_chunked_str)

# for word in list_chunked_str:
#     print(word)

print(len(list_chunked_str))
print(list_chunked_str[0])

keywords = kw_model.extract_keywords(list_chunked_str[0],
    stop_words='english',
    use_mmr=True,                  # Use MMR instead of MaxSum
    nr_candidates=30,              # Consider more candidates
    top_n=10,                      # Get more keywords
    diversity=0.2                  # Moderate diversity
)
print(keywords)


