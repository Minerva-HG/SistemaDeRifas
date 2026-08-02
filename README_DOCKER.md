# Ejecutar la aplicación con Docker

Este archivo contiene los comandos esenciales para construir y ejecutar los Dockerfiles de backend y frontend, además de la opción con Docker Compose.

## Backend

**Dockerfile:** `backend/Dockerfile`

### Comandos esenciales
```bash
cd backend
docker build -t rifas-system-backend:latest .
docker run -d --name rifas-system-backend -p 3000:3000 rifas-system-backend:latest
```

### Comprobar el contenedor
```bash
docker ps --filter "name=rifas-system-backend"
```

### Ver logs
```bash
docker logs -f rifas-system-backend
```

### Detener y eliminar
```bash
docker stop rifas-system-backend
docker rm rifas-system-backend
```
---
## Frontend

**Dockerfile:** `frontend/Dockerfile`

### Comandos esenciales
```bash
cd frontend
docker build -t rifas-system-frontend:latest .
docker run -d --name rifas-system-frontend -p 5173:80 rifas-system-frontend:latest
```

### Abrir en el navegador
```text
http://localhost:5173
```

### Ver logs
```bash
docker logs -f rifas-system-frontend
```

### Detener y eliminar
```bash
docker stop rifas-system-frontend
docker rm rifas-system-frontend
```

## Docker Compose

**Archivo:** `docker-compose.yml`

### Comandos esenciales
```bash
docker compose up --build
docker compose down
```

### Servicios expuestos
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## Notas
- El backend usa `backend/Dockerfile` y expone el puerto `3000`.
- El frontend usa `frontend/Dockerfile` y sirve la app en `http://localhost:5173`.
- Usa `docker compose up --build` para construir y levantar ambos servicios juntos.
