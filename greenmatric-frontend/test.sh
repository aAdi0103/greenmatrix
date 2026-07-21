#!/usr/bin/env bash
# Full local test suite: emulator + seed + unit tests + rules tests + lead-route integration.
set -e
cd "$(dirname "$0")"
J=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
[ -d "$J" ] || J="$(/usr/libexec/java_home -v 21 2>/dev/null)"
export JAVA_HOME="$J"

cleanup() { pkill -f "next dev" 2>/dev/null || true; pkill -f "cloud-firestore-emulator" 2>/dev/null || true; kill $(jobs -p) 2>/dev/null || true; }
trap cleanup EXIT

echo "▶ starting emulator"
firebase --project greenmatrix-demo emulators:start --only firestore,auth,storage >/tmp/gm-emu.log 2>&1 &
for port in 8080 9099 9199; do until curl -s -o /dev/null "http://127.0.0.1:$port"; do sleep 1; done; done
echo "  emulator up (firestore+auth+storage)"

echo "▶ seeding"; ./seed.sh

echo "▶ starting client dev (:3000)"
npm --prefix client run dev -- -p 3000 >/tmp/gm-client.log 2>&1 &
until curl -s -o /dev/null http://localhost:3000; do sleep 1; done
echo "  client up"

echo "▶ unit tests — admin"; ( cd admin && npx vitest run )
echo "▶ unit tests — client"; ( cd client && npx vitest run )
echo "▶ security rules"; ( cd admin && node tests/rules.check.mjs )
echo "▶ lead-route integration"; ( cd client && node scripts/emu-check.mjs )

echo ""
echo "✅ ALL SUITES PASSED"
