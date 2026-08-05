const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DevOps Assessment</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    background:linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb);
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
}

.container{
    width:90%;
    max-width:850px;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(10px);
    padding:40px;
    border-radius:18px;
    text-align:center;
    box-shadow:0 10px 30px rgba(0,0,0,.4);
}

h1{
    font-size:42px;
    margin-bottom:15px;
}

h2{
    color:#7dd3fc;
    margin-bottom:25px;
}

p{
    font-size:18px;
    margin:10px 0;
}

.grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:15px;
    margin-top:30px;
}

.card{
    background:white;
    color:#111;
    padding:20px;
    border-radius:12px;
    font-weight:bold;
}

.footer{
    margin-top:30px;
    color:#ddd;
    font-size:15px;
}
</style>

</head>

<body>

<div class="container">

<h1>🚀 DevOps Assessment</h1>

<h2>Successfully Deployed</h2>

<p>Containerized Node.js Application</p>

<div class="grid">

<div class="card">🐳 Docker</div>

<div class="card">🌐 Nginx Reverse Proxy</div>

<div class="card">🔒 HTTPS Ready</div>

<div class="card">⚙ GitHub Actions CI/CD</div>

<div class="card">🛡 Security Hardened</div>

<div class="card">☁ AWS EC2</div>

</div>

<div class="footer">

<p><b>Status:</b> ✅ Application Running</p>

<p><b>Hostname:</b> ${os.hostname()}</p>

<p><b>Deployment:</b> Multi-Server DevOps Assessment</p>

</div>

</div>

</body>
</html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date(),
    hostname: os.hostname()
  });
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
