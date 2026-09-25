🐳 Instalar Docker
Windows
winget install Docker.DockerDesktop
macOS
brew install --cask docker
Linux — Ubuntu/Debian
curl -fsSL https://get.docker.com | sudo sh
Luego verificar:
docker --version
docker run hello-world

🐳 Verificar / levantar Docker
Windows	macOS	Linux
1. Verificar	docker info	docker info	docker info
2. Levantar	Abrir Docker Desktop	open -a Docker	sudo systemctl start docker
3. Probar	docker run hello-world	docker run hello-world	docker run hello-world


docker run -d --name nginx -p 8090:80 nginx

docker stop nginx

docker rm nginx

vim Dockerfile
FROM nginx:alpine

RUN rm /usr/share/nginx/html/index.html

FROM nginx:alpine

RUN rm /usr/share/nginx/html/index.html

RUN printf '%s' '<!DOCTYPE html>\
<html>\
<head>\
<meta charset="UTF-8">\
<title>Container Days URP</title>\
<style>\
*{box-sizing:border-box}\
body{\
 margin:0;\
 min-height:100vh;\
 display:flex;\
 align-items:center;\
 justify-content:center;\
 font-family:Arial,sans-serif;\
 background:linear-gradient(135deg,#0f172a,#1e3a8a);\
 color:white;\
}\
.card{\
 width:700px;\
 padding:55px;\
 text-align:center;\
 border-radius:28px;\
 background:rgba(255,255,255,.1);\
 border:1px solid rgba(255,255,255,.2);\
 box-shadow:0 25px 60px rgba(0,0,0,.35);\
 backdrop-filter:blur(12px);\
}\
.logo{font-size:70px;margin-bottom:10px}\
h1{font-size:42px;margin:10px 0}\
h2{font-size:25px;color:#67e8f9;margin:10px 0 25px}\
p{font-size:20px;color:#dbeafe}\
.tags{margin-top:30px}\
.tag{\
 display:inline-block;\
 padding:10px 18px;\
 margin:5px;\
 border-radius:20px;\
 background:#0ea5e9;\
 font-weight:bold;\
}\
.footer{margin-top:35px;font-size:15px;color:#94a3b8}\
</style>\
</head>\
<body>\
<div class="card">\
<div class="logo">🐳 ☸️ 🚀</div>\
<h1>Hola Universidad Ricardo Palma 👋</h1>\
<h2>Soy Josua</h2>\
<p>Espero que les guste la clase 😎</p>\
<div class="tags">\
<span class="tag">Docker</span>\
<span class="tag">Containers</span>\
<span class="tag">Kubernetes</span>\
</div>\
<div class="footer">Container Days URP · Cloud Native</div>\
</div>\
</body>\
</html>' > /usr/share/nginx/html/index.html

EXPOSE 80

EXPOSE 80

docker build -t mi-app:v1 .

docker run -d --name mi-app -p 8090:80 mi-app:v1

docker rm -f mi-app

☸️ Instalar Kind
Windows — PowerShell
winget install Kubernetes.kind
macOS — Homebrew
brew install kind
Linux
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
🚀 Verificar
kind version
Crear un cluster
kind create cluster --name demo
Y verificar:
kubectl get nodes
Flujo para tu demo:
Docker → Kind → Kubernetes → kubectl

2.deployment.yaml
---
mario.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mario-deployment
spec:
  replicas: 2  # You can adjust the number of replicas as needed
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


1.deployment.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tetris-deployment
spec:
  replicas: 2  # You can adjust the number of replicas as needed
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
        - containerPort: 3000   # Use port 3000
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

kubectl port-forward svc/tetris-service 8091:80