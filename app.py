from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from blueai_runner_mock_complete import get_answer  # Mock model kullan

app = FastAPI(title="BlueAI Siber Güvenlik Uzmanı")

# Statik dosyalar ve template'ler
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/ask", response_class=HTMLResponse)
async def ask_question(request: Request, question: str = Form(...), question_type: str = Form(...)):
    if question_type == "incident":
        prompt = f"Bir siber güvenlik uzmanı gibi yanıtla:\n{question}"
    else:
        prompt = question
    
    try:
        answer = get_answer(prompt)
        return templates.TemplateResponse("index.html", {
            "request": request, 
            "question": question, 
            "answer": answer,
            "question_type": question_type
        })
    except Exception as e:
        return templates.TemplateResponse("index.html", {
            "request": request, 
            "question": question, 
            "error": f"Hata oluştu: {str(e)}",
            "question_type": question_type
        })

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)