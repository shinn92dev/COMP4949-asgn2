# FastAPI 서버 실행
run:
	@echo "🚀 Server starting at http://127.0.0.1:8000"
	@uvicorn main:app --reload

freeze:
	pip freeze > requirements.txt
	@echo "📦 requirements.txt created!"

install:
	pip install -r requirements.txt
	@echo "✅ Packages installed!"

clean:
	@echo "🧹 Cleaning __pycache__ and *.pyc files..."
	@find . -type d -name "__pycache__" -exec rm -r {} + 2>nul
	@find . -name "*.pyc" -type f -delete
