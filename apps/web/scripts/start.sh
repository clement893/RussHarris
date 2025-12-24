#!/bin/sh
set -e

# Use PORT from Railway environment, fallback to 3000
PORT=${PORT:-3000}
export PORT

# Check if we're in standalone mode (server.js exists in parent directory)
if [ -f ../../server.js ]; then
  echo "Starting in standalone mode on port $PORT..."
  cd ../..
  exec node server.js -p "$PORT" "$@"
elif [ -f server.js ]; then
  echo "Starting in standalone mode (current directory) on port $PORT..."
  exec node server.js -p "$PORT" "$@"
else
  echo "Starting in development mode on port $PORT..."
  exec next start -p "$PORT" "$@"
fi

