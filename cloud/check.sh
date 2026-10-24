#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
if [[ -f .cloud/env.sh ]]; then source .cloud/env.sh; fi
python3 -m json.tool .devcontainer/devcontainer.json >/dev/null
git diff --check
python3 -m json.tool catalog.json >/dev/null
for manifest in apps/*/stable.json; do python3 -m json.tool "$manifest" >/dev/null; done
node --test tests/site-catalog.test.mjs
echo "Distribution metadata and download-page contracts checked."
