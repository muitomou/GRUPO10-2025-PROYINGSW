FROM python:3.13.0-alpine3.20

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Instala dependencias de compilación necesarias para Alpine y pip
RUN apk add --no-cache --virtual .build-deps \
        gcc \
        jpeg-dev \
        libffi-dev \
        musl-dev \
        openssl-dev \
        python3-dev \
        zlib-dev \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps

WORKDIR /backend
COPY ./requirements.txt .
COPY ./backend .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
