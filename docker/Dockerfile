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
