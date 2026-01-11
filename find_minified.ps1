$files = Get-ChildItem -Path "apps\web\src\components" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $lines = ($content -split "`r?`n").Count
    if ($lines -le 3) {
        $firstLine = ($content -split "`r?`n" | Select-Object -First 1)
        if ($firstLine.Length -gt 500) {
            Write-Output $file.FullName
        }
    }
}
