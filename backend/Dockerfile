# Production Dockerfile for NASA HUNCH Antigravity Backend Service
FROM python:3.11-slim

# Prevents Python from writing pyc files to disc & buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies if required
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY app/ ./app/

# Expose port 8000
EXPOSE 8000

# Run uvicorn server binding to 0.0.0.0 and PORT env variable
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
