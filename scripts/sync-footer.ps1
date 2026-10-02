[CmdletBinding()]
param(
  [string]$ProjectRoot = ''
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
  $ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
}

$partialPath = Join-Path $ProjectRoot 'shared/site-footer.html'
$pagePaths = @(
  (Join-Path $ProjectRoot 'dist/index.html'),
  (Join-Path $ProjectRoot 'dist/404.html'),
  (Join-Path $ProjectRoot 'dist/about/index.html'),
  (Join-Path $ProjectRoot 'dist/contact/index.html'),
  (Join-Path $ProjectRoot 'dist/privacy/index.html'),
  (Join-Path $ProjectRoot 'dist/subprocessors/index.html'),
  (Join-Path $ProjectRoot 'dist/terms/index.html')
)
$startMarker = '<!-- BEGIN SITE FOOTER -->'
$endMarker = '<!-- END SITE FOOTER -->'
$partial = ([System.IO.File]::ReadAllText($partialPath)).Trim()
$block = "$startMarker`r`n$partial`r`n$endMarker"
$encoding = New-Object System.Text.UTF8Encoding($false)

foreach ($pagePath in $pagePaths) {
  if (-not (Test-Path -LiteralPath $pagePath -PathType Leaf)) {
    throw "Footer target does not exist: $pagePath"
  }

  $html = [System.IO.File]::ReadAllText($pagePath)
  $pattern = '(?is)<!-- BEGIN SITE FOOTER -->.*?<!-- END SITE FOOTER -->'

  if ([regex]::IsMatch($html, $pattern)) {
    $html = [regex]::Replace($html, $pattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($match) $block }, 1)
  } else {
    $legacyPattern = '(?is)<footer\b[^>]*\bclass="[^"]*\bsite-footer\b[^"]*"[^>]*>.*?</footer>'
    if ([regex]::IsMatch($html, $legacyPattern)) {
      $html = [regex]::Replace($html, $legacyPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($match) $block }, 1)
    } else {
      $bodyClose = [regex]::Match($html, '(?i)</body>')
      if (-not $bodyClose.Success) {
        throw "Footer target has no closing body tag: $pagePath"
      }

      $html = $html.Insert($bodyClose.Index, "$block`r`n    ")
    }
  }

  [System.IO.File]::WriteAllText($pagePath, $html, $encoding)
  Write-Output "Synced footer: $pagePath"
}
