# Ejemplo de uso con Docker Swarm

Este archivo explica cómo usar este proyecto con Docker Swarm y contiene ejemplos para los comandos más importantes.

## 1. Inicializar Docker Swarm

Para usar Swarm necesitas inicializar un cluster en tu máquina:

```bash
docker swarm init
```

Esto transforma tu motor Docker en un manager de Swarm.

## 2. Crear servicios

En este proyecto hay dos servicios principales: backend y frontend.

### Backend

```bash
docker service create --name rifas-system-backend --publish 3000:3000 mihernandezg/rifas-system-backend:latest
```

### Frontend

```bash
docker service create --name rifas-system-frontend --publish 5173:80 mihernandezg/rifas-system-frontend:latest
```

## 3. Inspeccionar servicios

Muestra información detallada sobre un servicio.

```bash
docker service inspect rifas-system-backend --pretty
```

## 4. Ver logs

Obtiene los logs de un servicio o de sus tareas.

```bash
docker service logs rifas-system-backend
```

## 5. Listar servicios

Muestra todos los servicios en el Swarm.

```bash
docker service ls
```

## 6. Listar tareas del servicio

Muestra los contenedores/tareas que pertenecen a un servicio.

```bash
docker service ps rifas-system-backend
```

## 7. Eliminar servicios

Eliminar un servicio del Swarm.

```bash
docker service rm rifas-system-backend
```

## 8. Revertir cambios de configuración

Si has actualizado un servicio y quieres volver a la versión anterior, usa rollback.

```bash
docker service rollback rifas-system-backend
```

## 9. Escalar servicios

Aumenta o reduce el número de réplicas de un servicio.

```bash
docker service scale rifas-system-backend=3
```

Esto creará hasta 3 réplicas del servicio backend.

## 10. Actualizar servicio

Usa este comando para cambiar la imagen, puertos u otros parámetros en un servicio existente.

```bash
docker service update --image mihernandezg/rifas-system-backend:latest rifas-system-backend
```

## 11. Terminar Docker Swarm

Cuando ya no necesites el cluster, puedes salir de Swarm.

```bash
docker swarm leave --force
```

## Descripción de comandos

- `create`: crea un nuevo servicio en el Swarm.
- `inspect`: muestra información detallada de uno o más servicios.
- `logs`: obtiene los registros de un servicio o de sus tareas.
- `ls`: lista los servicios que están corriendo en el Swarm.
- `ps`: lista las tareas (contenedores) asociadas a uno o más servicios.
- `rm`: elimina uno o varios servicios del Swarm.
- `rollback`: revierte el servicio a su configuración anterior.
- `scale`: ajusta el número de réplicas de uno o varios servicios.
- `update`: actualiza la configuración de un servicio existente.
- `docker swarm leave --force`: cierra el nodo actual del Swarm y termina el cluster en esta máquina.

## Ejemplo rápido

```bash
docker swarm init
docker service create --name rifas-system-backend --publish 3000:3000 mihernandezg/rifas-system-backend:latest
docker service create --name rifas-system-frontend --publish 5173:80 mihernandezg/rifas-system-frontend:latest
docker service ls
docker service logs rifas-system-backend
docker service update --image mihernandezg/rifas-system-backend:latest rifas-system-backend
docker service scale rifas-system-backend=2
docker service rm rifas-system-frontend
docker swarm leave --force
```

Con esto tendrás una referencia clara de cómo desplegar el proyecto en Docker Swarm.
