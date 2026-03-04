#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting setup for AI Engineer Trial By Fire..."

# 1. Environment Preparation
echo "📁 Creating data directories..."
mkdir -p backend/data/chroma
mkdir -p backend/data/uploads

# 2. Backend Setup
echo "🐍 Setting up Python environment..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ..

# 3. Frontend Setup
echo "📦 Setting up Node.js environment..."
cd frontend
npm install
cd ..

# 4. Ollama Check
echo "🦙 Checking Ollama..."
if ! command -v ollama &> /dev/null
then
    echo "⚠️  Ollama is not installed. Please install it from https://ollama.com"
else
    echo "✅ Ollama found. Ensuring llama3 is downloaded (this may take a while)..."
    ollama pull llama3
fi

echo "✨ Setup complete!"
echo "-------------------------------------------------------"
echo "To run the Backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8000"
echo "To run the Frontend: cd frontend && npm run dev"
echo "-------------------------------------------------------"
