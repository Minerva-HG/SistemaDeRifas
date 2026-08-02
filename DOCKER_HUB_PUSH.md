# Cómo subir una imagen a Docker Hub

Esta guía explica cómo publicar una imagen de Docker en Docker Hub usando el usuario `mihernandezg`.

## 1. Iniciar sesión en Docker Hub

Desde tu terminal, ejecuta:

```bash
docker login
docker login --username mihernandezg
```

Docker pedirá tu contraseña de Docker Hub. Ingresa tu contraseña cuando se te solicite.

> Si ya iniciaste sesión antes, este paso puede no ser necesario.

## 2. Construir la imagen localmente

Desde el directorio correcto, construye la imagen local:

- Backend:
  ```bash
  cd backend
docker build -t rifas-system-backend:latest .
  ```

- Frontend:
  ```bash
  cd frontend
docker build -t rifas-system-frontend:latest .
  ```

## 3. Etiquetar la imagen para Docker Hub

Docker Hub usa la forma `usuario/repositorio:tag`.

- Backend:
  ```bash
docker tag rifas-system-backend:latest mihernandezg/rifas-system-backend:latest
  ```

- Frontend:
  ```bash
docker tag rifas-system-frontend:latest mihernandezg/rifas-system-frontend:latest
  ```

## 4. Subir la imagen a Docker Hub

- Backend:
  ```bash
docker push mihernandezg/rifas-system-backend:latest
  ```

- Frontend:
  ```bash
docker push mihernandezg/rifas-system-frontend:latest
  ```

## 5. Verificar que la imagen está en Docker Hub

Visita tu repositorio en Docker Hub:

- `https://hub.docker.com/r/mihernandezg/rifas-system-backend`
- `https://hub.docker.com/r/mihernandezg/rifas-system-frontend`

## 6. Usar la imagen desde otro equipo

Una vez subida, otra persona o máquina puede descargarla con:

- Backend:
  ```bash
docker pull mihernandezg/rifas-system-backend:latest
  ```

- Frontend:
  ```bash
docker pull mihernandezg/rifas-system-frontend:latest
  ```

## Notas útiles

- Si necesitas usar otra etiqueta, cambia `latest` por la etiqueta que prefieras, por ejemplo `v1.0`.
- Si Docker Hub te pide autenticación, vuelve a ejecutar `docker login`.
- Si ya existe una imagen con la misma etiqueta y quieres reemplazarla, simplemente vuelve a ejecutar `docker push` luego de construir y etiquetar de nuevo.
