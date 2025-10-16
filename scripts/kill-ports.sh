#!/bin/bash

# Kill processes on ports 3000 and 3010

echo "🔍 Checking for processes on ports 3000 and 3010..."

# Check port 3000
PORT_3000=$(lsof -ti :3000)
if [ -n "$PORT_3000" ]; then
    echo "❌ Port 3000 is in use by PID: $PORT_3000"
    echo "   Killing process..."
    kill -9 $PORT_3000
    echo "✅ Port 3000 is now free"
else
    echo "✅ Port 3000 is already free"
fi

# Check port 3010
PORT_3010=$(lsof -ti :3010)
if [ -n "$PORT_3010" ]; then
    echo "❌ Port 3010 is in use by PID: $PORT_3010"
    echo "   Killing process..."
    kill -9 $PORT_3010
    echo "✅ Port 3010 is now free"
else
    echo "✅ Port 3010 is already free"
fi

echo ""
echo "🚀 You can now run: yarn dev:https"
