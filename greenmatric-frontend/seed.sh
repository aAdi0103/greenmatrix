#!/usr/bin/env bash
# Seed the running emulator with demo users, leads and articles.
set -e
cd "$(dirname "$0")/admin"
export GCLOUD_PROJECT=greenmatrix-demo
export FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
node scripts/seed.mjs
