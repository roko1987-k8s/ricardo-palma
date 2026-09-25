# 🐳 Container Days URP — Docker, GitHub Actions & Kubernetes

Material práctico para la charla **Container Days URP**.

Flujo del laboratorio:

```text
Docker → Container → Docker Image → GitHub Actions → Docker Hub → Kind → Kubernetes
```

---

## 1. 🐳 Instalar Docker

### Windows

```powershell
winget install Docker.DockerDesktop
```

### macOS

```bash
brew install --cask docker
```

### Linux — Ubuntu/Debian

```bash
curl -fsSL https://get.docker.com | sudo sh
```

---

## 2. 🐳 Verificar y levantar Docker

| | Windows | macOS | Linux |
|---|---|---|---|
| **Verificar** | `docker info` | `docker info` | `docker info` |
| **Levantar** | Abrir Docker Desktop | `open -a Docker` | `sudo systemctl start docker` |
| **Probar** | `docker run hello-world` | `docker run hello-world` | `docker run hello-world` |

En Linux, para iniciar Docker automáticamente:

```bash
sudo systemctl enable --now docker
```

---

## 3. 🚀 Ejecutar Nginx directamente con Docker

```bash
docker run -d --name nginx -p 8090:80 nginx
```

Verificar:

```bash
docker ps
```

Abrir:

```text
http://localhost:8090
```

Detener y eliminar:

```bash
docker stop nginx
docker rm nginx
```

O directamente:

```bash
docker rm -f nginx
```

---

## 4. 📦 Crear nuestra propia Docker Image

Estructura:

```text
ricardo-palma/
├── docker/
│   ├── index.html
│   └── Dockerfile
│
└── .github/
    └── workflows/
        └── docker.yml
```

### `docker/index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Container Days URP</title>
</head>
<body>
    <h1>🐳 Hola Universidad Ricardo Palma 👋</h1>
    <h2>Soy Josua 🚀</h2>
    <p>Espero que les guste la clase 😎</p>
</body>
</html>
```

### `docker/Dockerfile`

```dockerfile
FROM nginx:alpine

RUN rm /usr/share/nginx/html/index.html

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

---

## 5. 🔨 Construir y ejecutar la imagen

Desde la raíz del proyecto:

```bash
docker build -t mi-app:v1 ./docker
```

Ver imágenes:

```bash
docker images
```

Ejecutar:

```bash
docker run -d --name mi-app -p 8090:80 mi-app:v1
```

Abrir:

```text
http://localhost:8090
```

Eliminar:

```bash
docker rm -f mi-app
```

---

# 6. 🤖 GitHub Actions + Docker Hub

Objetivo:

```text
git push
   ↓
GitHub Actions
   ↓
docker build
   ↓
docker push
   ↓
Docker Hub
```

> `.github/workflows/` debe estar en la **raíz del repositorio** para que GitHub Actions detecte automáticamente el workflow.

---

## 7. 🔐 Crear Access Token en Docker Hub

En Docker Hub:

```text
Account Settings
  ↓
Personal access tokens
  ↓
Generate new token
```

Ejemplo:

```text
Description: github-actions-ricardo-palma
Permission: Read & Write
```

Genera el token y **cópialo inmediatamente**. Docker Hub lo muestra una sola vez.

No publiques el token ni lo coloques directamente en `docker.yml`.

---

## 8. 🔑 Crear el Secret en GitHub

En el repositorio:

```text
Settings
  ↓
Secrets and variables
  ↓
Actions
  ↓
Repository secrets
  ↓
New repository secret
```

Crear:

```text
Name: DOCKERHUB_TOKEN
```

En `Secret`, pega el Access Token de Docker Hub.

> Debe ser un **Repository secret**, no un Environment secret, para este workflow.

---

## 9. ⚙️ Crear GitHub Actions

Crear:

```text
.github/workflows/docker.yml
```

Contenido:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main

jobs:
  docker:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: roko1987
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push
        uses: docker/build-push-action@v6
        with:
          context: ./docker
          push: true
          tags: roko1987/ricardo-palma:latest
```

El repositorio de Docker Hub utilizado por el ejemplo es:

```text
roko1987/ricardo-palma:latest
```

Para un alumno, cambiar `roko1987` por su propio usuario de Docker Hub.

---

## 10. 👨‍💻 Crear tu propio repositorio a partir del laboratorio

Clonar el repositorio de la clase:

```bash
git clone https://github.com/roko1987-k8s/ricardo-palma.git
cd ricardo-palma
```

Ver el remote original:

```bash
git remote -v
```

Eliminarlo:

```bash
git remote remove origin
```

Verificar:

```bash
git remote -v
```

Ahora crea **tu propio repositorio en GitHub**, por ejemplo:

```text
ricardo-palma-docker
```

Se recomienda crearlo vacío: sin README, `.gitignore` ni License.

Conectar tu repositorio:

```bash
git remote add origin https://github.com/TU_USUARIO/ricardo-palma-docker.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

Verificar:

```bash
git remote -v
```

> No necesitas `git init` después de `git clone`: el repositorio Git ya viene inicializado.

---

## 11. 🐳 Publicar en tu propio Docker Hub

Cada alumno debe:

1. Crear su repositorio en Docker Hub, por ejemplo `TU_USUARIO/ricardo-palma`.
2. Crear su propio Access Token.
3. Crear el secret `DOCKERHUB_TOKEN` en su repositorio de GitHub.
4. Cambiar el usuario y el `tags` del workflow.

Ejemplo:

```yaml
username: TU_USUARIO
```

```yaml
tags: TU_USUARIO/ricardo-palma:latest
```

---

# 12. ☸️ Instalar Kind

Kind permite ejecutar Kubernetes utilizando Docker.

### Windows — PowerShell

```powershell
winget install Kubernetes.kind
```

### macOS — Homebrew

```bash
brew install kind
```

### Linux — x86_64

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

Verificar:

```bash
kind version
```

---

## 13. 🚀 Crear un cluster Kubernetes

```bash
kind create cluster --name demo
```

Verificar:

```bash
kubectl get nodes
```

Flujo:

```text
🐳 Docker → ☸️ Kind → ☸️ Kubernetes → kubectl
```

---

# 14. 🎮 Desplegar Tetris

Crear `tetris.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tetris-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tetris
  template:
    metadata:
      labels:
        app: tetris
    spec:
      containers:
        - name: tetris
          image: guopingjia/tetris:cfe-demo
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: tetris-service
spec:
  type: ClusterIP
  selector:
    app: tetris
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

Aplicar:

```bash
kubectl apply -f tetris.yaml
```

Verificar:

```bash
kubectl get pods
kubectl get svc
```

Acceder:

```bash
kubectl port-forward svc/tetris-service 8091:80
```

Abrir:

```text
http://localhost:8091
```

Cancelar:

```text
Ctrl + C
```

---

# 15. 🍄 Desplegar Mario

Crear `mario.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mario-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: mario
  template:
    metadata:
      labels:
        app: mario
    spec:
      containers:
        - name: mario-container
          image: guopingjia/mario:cfe-demo
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: mario-service
spec:
  type: ClusterIP
  selector:
    app: mario
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Aplicar:

```bash
kubectl apply -f mario.yaml
```

Verificar:

```bash
kubectl get pods
kubectl get svc
```

Acceder:

```bash
kubectl port-forward svc/mario-service 8092:80
```

Abrir:

```text
http://localhost:8092
```

Cancelar:

```text
Ctrl + C
```

---

# 16. 🔍 Comandos útiles de Kubernetes

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all
```

Información de un Pod:

```bash
kubectl describe pod <pod>
```

Logs:

```bash
kubectl logs <pod>
```

---

# 17. 🧹 Limpiar el laboratorio

Eliminar Tetris:

```bash
kubectl delete -f tetris.yaml
```

Eliminar Mario:

```bash
kubectl delete -f mario.yaml
```

Eliminar el cluster Kind:

```bash
kind delete cluster --name demo
```

---

# 🎯 Resumen

```text
👨‍💻 Código
    ↓
🐳 Docker
    ↓
📦 Docker Image
    ↓
⚙️ GitHub Actions
    ↓
🐳 Docker Hub
    ↓
☸️ Kind / Kubernetes
    ↓
🎮 Tetris / 🍄 Mario
```

**Container Days URP — Contenedores y Kubernetes desde cero 🚀**
