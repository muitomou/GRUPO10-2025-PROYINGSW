FROM python:3.13.0-alpine3.20

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Instala dependencias de compilación necesarias para Alpine
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    python3-dev \
    libffi-dev \
    openssl-dev \
    jpeg-dev \
    zlib-dev \
    && pip install --no-cache-dir --upgrade pip

WORKDIR /backend
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Limpia dependencias de compilación
RUN apk del .build-deps

COPY ./backend .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]