#!/bin/bash

# Backup configuration
BACKUP_DIR=/home/ubuntu/backups
APP_DIR=/home/ubuntu/devops-assessment
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="backup-$DATE.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Compress application
tar -czf $BACKUP_DIR/$BACKUP_FILE $APP_DIR

echo "Backup created: $BACKUP_DIR/$BACKUP_FILE"

# Copy to second server (replace with actual details)
# scp $BACKUP_DIR/$BACKUP_FILE devops@INDIA_SERVER_IP:/home/devops/backups/
