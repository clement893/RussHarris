# Script to format all minified files using Prettier
$minifiedFiles = Get-Content "minified_files.txt"
$total = $minifiedFiles.Count
$current = 0

Write-Host "Formatting $total minified files with Prettier..."

# Convert to relative paths and format with Prettier
$relativeFiles = @()
foreach ($file in $minifiedFiles) {
    $relativePath = $file.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    $relativeFiles += $relativePath
}

# Format all files at once with Prettier
$fileList = $relativeFiles -join " "
& npx prettier --write $relativeFiles 2>&1 | Out-Null

Write-Host "Formatted $total files successfully!"
