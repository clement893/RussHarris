# Simple script to create Canadian Tour Events 2026
# This script will create the events directly in the database

param(
    [string]$DatabaseUrl = $env:DATABASE_URL
)

if (-not $DatabaseUrl) {
    Write-Host "❌ DATABASE_URL not set." -ForegroundColor Red
    Write-Host "Please set it: `$env:DATABASE_URL = 'postgresql://user:password@host:port/database'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or use Railway CLI:" -ForegroundColor Yellow
    Write-Host "  railway run psql -f scripts/create_canadian_tour_events.sql" -ForegroundColor Cyan
    exit 1
}

$scriptPath = Join-Path $PSScriptRoot "create_canadian_tour_events.sql"

Write-Host "Creating Canadian Tour Events 2026..." -ForegroundColor Cyan
Write-Host "Database: $DatabaseUrl" -ForegroundColor Gray
Write-Host ""

# Try to execute via psql
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if ($psqlPath) {
    Write-Host "Executing SQL script via psql..." -ForegroundColor Green
    & psql $DatabaseUrl -f $scriptPath
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Events created successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Error executing script." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️  psql not found. Please use one of these options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install PostgreSQL client tools" -ForegroundColor Cyan
    Write-Host "Option 2: Use Railway CLI:" -ForegroundColor Cyan
    Write-Host "  railway run psql -f backend/scripts/create_canadian_tour_events.sql" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Copy the SQL script and run it manually in your database client" -ForegroundColor Cyan
    Write-Host "  Script location: $scriptPath" -ForegroundColor Gray
    exit 1
}
