#!/usr/bin/env bash
# Start the Firebase emulator suite with JDK 21 (firebase-tools 15 requires 21+).
set -e
export JAVA_HOME="$(/usr/libexec/java_home -v 21)"
cd "$(dirname "$0")"
exec firebase --project greenmatrix-demo emulators:start --only firestore,auth,storage "$@"
