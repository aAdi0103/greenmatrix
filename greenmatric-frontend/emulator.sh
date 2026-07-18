#!/usr/bin/env bash
# Start the Firebase emulator suite with JDK 21 (firebase-tools 15 requires 21+).
set -e
J=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
[ -d "$J" ] || J="$(/usr/libexec/java_home -v 21 2>/dev/null)"
export JAVA_HOME="$J"
cd "$(dirname "$0")"
exec firebase --project greenmatrix-demo emulators:start --only firestore,auth,storage "$@"
