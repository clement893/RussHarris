# Script to format minified files using Prettier
$files = Get-Content "minified_files.txt"

Write-Host "Formatting $($files.Count) minified files..."

foreach ($file in $files) {
    $relativePath = $file.Replace((Get-Location).Path + "\", "")
    Write-Host "Formatting: $relativePath"
    npx prettier --write "$relativePath" 2>&1 | Out-Null
}

Write-Host "Done!"
