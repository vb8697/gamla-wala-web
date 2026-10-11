#!/usr/bin/env bash
set -e

# GamlaWala PostgreSQL Automated Backup Script
BACKUP_DIR="${BACKUP_DIR:-./infra/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/gamlawala_backup_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "🌱 Starting GamlaWala database backup..."
docker exec -t gamlawala_postgres pg_dump -U postgres gamlawala | gzip > "${BACKUP_FILE}"

echo "✅ Backup successfully created at: ${BACKUP_FILE}"
echo "📦 Size: $(ls -lh ${BACKUP_FILE} | awk '{print $5}')"
