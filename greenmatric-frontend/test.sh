#!/usr/bin/env bash
# Full test suite against the real Supabase project: unit tests + live e2e verification.
set -e
cd "$(dirname "$0")"

cleanup() { pkill -f "next dev" 2>/dev/null || true; kill $(jobs -p) 2>/dev/null || true; }
trap cleanup EXIT

echo "▶ unit tests — admin"; ( cd admin && npx vitest run )
echo "▶ unit tests — client"; ( cd client && npx vitest run )

echo "▶ seeding known state"; ./seed.sh

echo "▶ starting dev servers"
npm --prefix client run dev -- -p 3000 >/tmp/gm-client.log 2>&1 &
npm --prefix admin  run dev -- -p 3001 >/tmp/gm-admin.log 2>&1 &
for p in 3000 3001; do until curl -s -o /dev/null "http://localhost:$p"; do sleep 1; done; done
echo "  dev servers up"

echo "▶ live verification (Supabase RLS + auth + routes)"
( cd client && set -a; . ./.env.local; set +a; node scripts/verify.mjs )

echo ""
echo "✅ ALL SUITES PASSED"
