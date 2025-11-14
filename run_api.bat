@echo off
setlocal

if not exist .venv (
  python -m venv .venv
)
call .venv\Scripts\activate

pip install -r requirements.txt

if not exist "models\tinyllama" (
  echo Downloading TinyLlama chat model...
  python scripts\download_model.py --model tinyllama/TinyLlama-1.1B-Chat-v1.0 --target models\tinyllama
)

set "HOST=0.0.0.0"
set "PORT=8000"
uvicorn app.server:app --host %HOST% --port %PORT% --reload
