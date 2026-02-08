#!/bin/bash

# Pre-deployment verification script
# Catches missing modules and type errors before deployment

set -e

echo "🔍 Running pre-deployment verification..."

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must be run from frontend directory"
    exit 1
fi

echo "📦 Checking required files..."

# Check for critical configuration files
REQUIRED_FILES=(
    "src/config.ts"
    "src/backend.d.ts"
    "src/backend.idl.ts"
    "src/hooks/useActor.ts"
    "src/hooks/useInternetIdentity.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files present"

echo "🔧 Running TypeScript type check..."
npm run typescript-check || {
    echo "❌ TypeScript type check failed"
    exit 1
}

echo "✅ TypeScript type check passed"

echo "🏗️  Running build..."
npm run build:skip-bindings || {
    echo "❌ Build failed"
    exit 1
}

echo "✅ Build successful"

echo "✨ Pre-deployment verification complete!"
exit 0
