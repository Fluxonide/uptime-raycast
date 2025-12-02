Add-Type -AssemblyName System.Drawing
$path = "c:\Users\ranit\Downloads\uptime-raycast\assets\extension_icon.png"
if (Test-Path $path) {
    try {
        $img = [System.Drawing.Image]::FromFile($path)
        Write-Host "Width: $($img.Width)"
        Write-Host "Height: $($img.Height)"
        Write-Host "Format: $($img.RawFormat.Guid)"
        $img.Dispose()
    }
    catch {
        Write-Error "Could not open image: $_"
    }
}
else {
    Write-Error "File not found"
}
