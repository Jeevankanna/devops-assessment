# DevOps Assessment – Multi-Server Node Deployment, Reverse Proxy & Automation Setup

## Project Overview

This project demonstrates a complete DevOps deployment pipeline using Docker, Docker Compose, Nginx Reverse Proxy, GitHub Actions CI/CD, AWS EC2, basic server hardening, and automated backups.

The application is containerized and deployed on an Ubuntu EC2 instance. Nginx acts as a reverse proxy and serves the application over HTTP/HTTPS. GitHub Actions automatically deploys the latest changes whenever code is pushed to the `main` branch.

---

# Technologies Used

- AWS EC2 (Ubuntu)
- Docker
- Docker Compose
- Nginx
- GitHub Actions
- Git
- UFW Firewall
- Bash Shell Script
- SSH

---

# Project Structure

```
devops-assessment/
│
├── app/
├── Dockerfile
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── backup.sh
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml
```

---

# Step 1 – Launch AWS EC2 Instance

1. Launch an Ubuntu EC2 instance.
2. Create or use an existing Key Pair.
3. Configure Security Group to allow:
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
4. Connect to the instance using SSH.

```bash
ssh -i key.pem ubuntu@<EC2_PUBLIC_IP>
```

---

# Step 2 – Update the Server

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 3 – Install Required Packages

```bash
sudo apt install -y \
git \
curl \
docker.io \
docker-compose-v2 \
nginx
```

Enable Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Add Ubuntu user to Docker group

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

---

# Step 4 – Clone the Repository

```bash
git clone https://github.com/<username>/<repository>.git

cd devops-assessment
```

---

# Step 5 – Containerize the Application

Created an optimized Dockerfile to build and run the application inside a Docker container.

Build Docker image

```bash
docker build -t devops-app .
```

---

# Step 6 – Docker Compose

Created `docker-compose.yml` to run:

- Application Container
- Nginx Reverse Proxy

Start Containers

```bash
docker compose up -d --build
```

Verify

```bash
docker ps
```

---

# Step 7 – Configure Nginx Reverse Proxy

Created `nginx.conf`.

Configured:

- HTTP (Port 80)
- HTTPS (Port 443)
- Reverse Proxy
- SSL (Self-Signed Certificate)

Test

```bash
curl http://localhost
```

HTTPS

```bash
curl -k https://localhost
```

---

# Step 8 – Configure GitHub Actions CI/CD

Created

```
.github/workflows/deploy.yml
```

Pipeline performs:

- Trigger on every push to `main`
- Checkout latest source code
- Connect to EC2 using SSH
- Pull latest changes
- Restart Docker containers automatically

Configured GitHub Secrets:

- EC2_HOST
- EC2_SSH_KEY

Push code

```bash
git add .

git commit -m "Deploy application"

git push origin main
```

Deployment starts automatically through GitHub Actions.

---

# Step 9 – Configure Firewall

Install UFW

```bash
sudo apt install ufw -y
```

Allow only required ports

```bash
sudo ufw allow 22/tcp

sudo ufw allow 80/tcp

sudo ufw allow 443/tcp
```

Enable Firewall

```bash
sudo ufw enable
```

Verify

```bash
sudo ufw status
```

Only ports **22**, **80**, and **443** are accessible.

---

# Step 10 – Secure SSH Access

Created a dedicated non-root user.

```bash
sudo adduser devops
```

Added permissions

```bash
sudo usermod -aG sudo devops

sudo usermod -aG docker devops
```

Copied SSH public key

```bash
sudo mkdir -p /home/devops/.ssh

sudo cp /home/ubuntu/.ssh/authorized_keys /home/devops/.ssh/

sudo chown -R devops:devops /home/devops/.ssh

sudo chmod 700 /home/devops/.ssh

sudo chmod 600 /home/devops/.ssh/authorized_keys
```

Updated SSH configuration

```bash
sudo nano /etc/ssh/sshd_config
```

Configured

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Restart SSH

```bash
sudo systemctl restart ssh
```

---

# Step 11 – Backup Automation

Created

```
backup.sh
```

The script performs:

- Creates backup directory
- Compresses application into `.tar.gz`
- Copies backup to secondary server using SCP (or RSYNC)
- Displays backup status

Execute

```bash
chmod +x backup.sh

./backup.sh
```

---

# Step 12 – Schedule Automatic Backup

Open Cron

```bash
crontab -e
```

Add

```cron
0 2 * * * /home/ubuntu/devops-assessment/backup.sh
```

Verify

```bash
crontab -l
```

The backup runs automatically every day at **2:00 AM**.

---

# Step 13 – Verify Deployment

Verify running containers

```bash
docker ps
```

Test application

```bash
curl http://localhost
```

Test HTTPS

```bash
curl -k https://localhost
```

Push a change to GitHub to verify automatic deployment through GitHub Actions.

---

# Security Implemented

- Dockerized application
- Nginx Reverse Proxy
- SSL Configuration
- UFW Firewall
- SSH Key Authentication
- Root Login Disabled
- Password Authentication Disabled
- Dedicated Non-root User
- Automated Daily Backup
- GitHub Actions CI/CD

---

# Deliverables

- Dockerfile
- docker-compose.yml
- nginx.conf
- GitHub Actions Workflow
- backup.sh
- README.md
- Source Code
- Live EC2 Deployment

---

# Author

Jeevan Kanna
