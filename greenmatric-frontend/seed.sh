#!/usr/bin/env bash
# Seed / initialise the Supabase project with demo users, leads, articles and product images.
set -e
cd "$(dirname "$0")/admin"
set -a; . ./.env.local; set +a   # export NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
node scripts/seed.mjs
