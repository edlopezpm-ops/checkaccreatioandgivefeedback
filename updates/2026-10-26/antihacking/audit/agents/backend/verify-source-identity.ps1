$ErrorActionPreference = 'Stop'
$auditRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$manifestPath = Join-Path $auditRoot 'SNAPSHOT.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$currentRoot = (Resolve-Path -LiteralPath $manifest.root).Path
$frozenRoot = (Resolve-Path -LiteralPath $manifest.snapshot).Path
$checks = @()
foreach ($entry in $manifest.files) {
    foreach ($side in @(@{ Name = 'original'; Root = $currentRoot }, @{ Name = 'snapshot'; Root = $frozenRoot })) {
        $candidate = Join-Path $side.Root $entry.path
        $exists = Test-Path -LiteralPath $candidate -PathType Leaf
        $match = $false
        $sizeMatch = $false
        if ($exists) {
            $info = Get-Item -LiteralPath $candidate
            $sizeMatch = [long]$info.Length -eq [long]$entry.bytes
            $match = (Get-FileHash -LiteralPath $candidate -Algorithm SHA256).Hash.ToLowerInvariant() -eq $entry.sha256
        }
        $checks += [ordered]@{ side = $side.Name; path = $entry.path; exists = $exists; sizeMatch = $sizeMatch; sha256Match = $match }
    }
}
$headNow = (& git -C $currentRoot rev-parse HEAD).Trim()
$branchNow = (& git -C $currentRoot branch --show-current).Trim()
$statusNow = (& git -C $currentRoot status --short) -join "`n"
$statusMatch = $statusNow.TrimEnd() -eq $manifest.status.TrimEnd()
$mismatches = @($checks | Where-Object { -not $_.exists -or -not $_.sizeMatch -or -not $_.sha256Match })
$receipt = [ordered]@{
    verifiedUtc = [DateTime]::UtcNow.ToString('o')
    method = 'Independent PowerShell Get-FileHash SHA256 plus file size, no product-provided comparator'
    manifestSha256 = (Get-FileHash -LiteralPath $manifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
    manifestFileCount = @($manifest.files).Count
    comparedCopies = 2
    comparisons = $checks.Count
    mismatches = $mismatches
    originalHeadUnchanged = $headNow -eq $manifest.head
    originalBranchUnchanged = $branchNow -eq $manifest.branch
    originalDirtyStateUnchanged = $statusMatch
    result = if ($mismatches.Count -eq 0 -and $headNow -eq $manifest.head -and $branchNow -eq $manifest.branch -and $statusMatch) { 'PASS' } else { 'FAIL' }
    limitations = 'Checks only the 712 explicitly frozen source/untracked paths. node_modules/dist/cache/private credentials and remote deployment are separate; excluded content is not claimed identical.'
}
$receipt | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'source-identity-readback.json') -Encoding utf8
$receipt | ConvertTo-Json -Depth 8
if ($receipt.result -ne 'PASS') { exit 1 }
