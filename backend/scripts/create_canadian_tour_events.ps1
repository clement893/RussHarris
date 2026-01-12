# PowerShell script to create Canadian Tour Events 2026
# Usage: .\create_canadian_tour_events.ps1
# Or: $env:DATABASE_URL='postgresql://...'; .\create_canadian_tour_events.ps1

# Get database URL from environment variable or command line argument
$databaseUrl = $env:DATABASE_URL
if (-not $databaseUrl -and $args.Count -ge 1) {
    $databaseUrl = $args[0]
}
if (-not $databaseUrl) {
    Write-Host "❌ DATABASE_URL not set. Please set it as environment variable or pass as argument:" -ForegroundColor Red
    Write-Host "   `$env:DATABASE_URL = 'postgresql://user:password@host:port/database'" -ForegroundColor Yellow
    Write-Host "   OR" -ForegroundColor Yellow
    Write-Host "   .\create_canadian_tour_events.ps1 'postgresql://user:password@host:port/database'" -ForegroundColor Yellow
    exit 1
}

$scriptPath = Join-Path $PSScriptRoot "create_canadian_tour_events.sql"

Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 69) -ForegroundColor Cyan
Write-Host "Creating Canadian Tour Events 2026" -ForegroundColor Cyan
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 69) -ForegroundColor Cyan
Write-Host ""

# Check if psql is available
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "❌ psql not found. Please install PostgreSQL client tools." -ForegroundColor Red
    Write-Host "   Or use the Python script: python scripts/create_canadian_tour_events.py" -ForegroundColor Yellow
    exit 1
}

Write-Host "Executing SQL script..." -ForegroundColor Green
& psql $databaseUrl -f $scriptPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Events created successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Error creating events. Check the error messages above." -ForegroundColor Red
    exit 1
}
