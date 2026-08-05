# DevOps Assessment – Step-by-Step Procedure 

This is the complete procedure I followed to complete the assessment.

---

# Prerequisites

* AWS Account
* Ubuntu EC2 Instance
* GitHub Repository
* SSH Key Pair (.pem)
* Docker & Docker Compose
* GitHub Actions

---

# Step 1: Launch EC2 Instance

1. Log in to AWS Console.
2. Launch an Ubuntu EC2 instance.
3. Create or select an existing Key Pair.
4. Allow inbound ports:

   * 22 (SSH)
   * 80 (HTTP)
   * 443 (HTTPS)
5. Connect to the instance using SSH.

```bash
ssh -i key.pem ubuntu@<PUBLIC_IP>
```

---

# Step 2: Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 3: Install Required Packages

```bash
sudo apt install -y \
git \
curl \
docker.io \
docker-compose-v2 \
nginx
```

Start Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Add current user to Docker group

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

---

# Step 4: Clone GitHub Repository

```bash
git clone https://github.com/<username>/<repository>.git
cd <repository>
```

---

# Step 5: Create Dockerfile

* Used a multi-stage Docker build.
* Built the application.
* Copied only the required files into the final image.
* Exposed the application port.

---

# Step 6: Configure Docker Compose

Created **docker-compose.yml** containing:

* Application Container
* Nginx Reverse Proxy Container

Started the project

```bash
docker compose up -d --build
```

Verified

```bash
docker ps
```

---

# Step 7: Configure Nginx Reverse Proxy

Created **nginx.conf**

Configured:

* Port 80
* Port 443
* Reverse Proxy
* SSL (Self-Signed Certificate)

Tested

```bash
curl http://localhost
```

and

```bash
curl -k https://localhost
```

---

# Step 8: Configure GitHub Actions CI/CD

Created

```
.github/workflows/deploy.yml
```

Workflow performs:

* Trigger on push to main
* Checkout repository
* Connect to EC2 using SSH
* Pull latest code
* Restart Docker containers

Added GitHub Secrets

```
EC2_HOST
EC2_SSH_KEY
```

Pushed code

```bash
git add .
git commit -m "CI/CD"
git push origin main
```

Verified GitHub Actions deployment.

---

# Step 9: Configure Firewall

Installed UFW

```bash
sudo apt install ufw -y
```

Allowed only required ports

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Enabled Firewall

```bash
sudo ufw enable
```

Verified

```bash
sudo ufw status
```

---

# Step 10: Create Non-Root User

Created user

```bash
sudo adduser devops
```

Added permissions

```bash
sudo usermod -aG sudo devops
sudo usermod -aG docker devops
```

Copied SSH Key

```bash
sudo mkdir -p /home/devops/.ssh

sudo cp /home/ubuntu/.ssh/authorized_keys /home/devops/.ssh/

sudo chown -R devops:devops /home/devops/.ssh

sudo chmod 700 /home/devops/.ssh

sudo chmod 600 /home/devops/.ssh/authorized_keys
```

Verified login using SSH.

---

# Step 11: Secure SSH

Edited SSH configuration

```bash
sudo nano /etc/ssh/sshd_config
```

Updated

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Restarted SSH

```bash
sudo systemctl restart ssh
```

---

# Step 12: Create Backup Script

Created

```
backup.sh
```

The script:

* Creates Backup Directory
* Compresses Application
* Creates .tar.gz Archive
* Copies Backup to Secondary Server using SCP (or RSYNC)
* Prints Success Message

Made executable

```bash
chmod +x backup.sh
```

Executed

```bash
./backup.sh
```

---

# Step 13: Automate Backup

Opened Cron

```bash
crontab -e
```

Added

```cron
0 2 * * * /home/ubuntu/devops-assessment/backup.sh
```

Verified

```bash
crontab -l
```

---

# Step 14: Test Application

Verified Containers

```bash
docker ps
```

Verified Application

```bash
curl http://localhost
```

Verified HTTPS

```bash
curl -k https://localhost
```

Verified GitHub Actions

* Push Code
* Automatic Deployment
* Containers Restart Successfully

---

# Step 15: Push Final Code

```bash
git add .

git commit -m "Completed DevOps Assessment"

git push origin main
```

---

# Step 16: Deliverables Submitted

Submitted:

* GitHub Repository Link
* Live EC2 Public IP / URL
* README.md Documentation

---

# Project Structure

```text
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

This procedure closely follows the assessment requirements while documenting the complete setup from infrastructure creation through deployment, security hardening, backup automation, and final submission.
