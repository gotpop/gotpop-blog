#!/bin/bash

echo "🔐 Setting up HTTPS for Storyblok Visual Editor"
echo ""

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "❌ mkcert is not installed"
    echo "📦 Installing mkcert..."
    brew install mkcert
else
    echo "✅ mkcert is already installed"
fi

# Install local CA
echo "🔧 Installing local CA..."
mkcert -install

# Create generated directory if it doesn't exist
mkdir -p generated

# Check if certificates already exist
if [ -f "generated/localhost.pem" ] && [ -f "generated/localhost-key.pem" ]; then
    echo "⚠️  Certificates already exist"
    read -p "Do you want to regenerate them? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "✅ Using existing certificates"
        exit 0
    fi
fi

# Create certificates
echo "📜 Creating SSL certificates for localhost..."
cd generated
mkcert localhost
cd ..

# Check if certificates were created
if [ -f "generated/localhost.pem" ] && [ -f "generated/localhost-key.pem" ]; then
    echo "✅ Certificates created successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Install local-ssl-proxy globally: npm install -g local-ssl-proxy"
    echo "   2. Start dev server with HTTPS: npm run dev:https"
    echo "   3. Or run proxy separately: npm run proxy"
    echo ""
    echo "🌐 URLs:"
    echo "   HTTP:  http://localhost:3000"
    echo "   HTTPS: https://localhost:3010"
    echo ""
    echo "🎨 Configure Storyblok:"
    echo "   Set preview URL to: https://localhost:3010"
else
    echo "❌ Failed to create certificates"
    exit 1
fi
