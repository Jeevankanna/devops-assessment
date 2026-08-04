# DevOps Assessment

## Technologies
- Docker
- Docker Compose
- Nginx
- GitHub Actions
- AWS EC2
- Ubuntu
- UFW

## Setup
1. Launch EC2.
2. Install Docker and Docker Compose.
3. Clone the repository.
4. Run:
   docker compose up -d --build

## CI/CD
- Push to `main`
- GitHub Actions connects via SSH
- Pulls latest code
- Restarts containers

## Security
- UFW allows only 22, 80, 443
- Root login disabled
- Password authentication disabled
- SSH key authentication enabled
- Non-root `devops` user created

## Backup
- `backup.sh` compresses the application.
- Scheduled with cron.
- Ready to sync to a secondary server using `scp` or `rsync`.
