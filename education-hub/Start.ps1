$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
    & $nodeCommand.Source server.mjs
} else {
    $bundledNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (-not (Test-Path -LiteralPath $bundledNode)) { throw 'Node.js를 찾을 수 없습니다. Node.js 설치 후 node server.mjs를 실행하세요.' }
    & $bundledNode server.mjs
}
