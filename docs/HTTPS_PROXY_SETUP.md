# HTTPS Proxy Setup for Storyblok Visual Editor

Storyblok's Visual Editor requires HTTPS to work properly. This guide will help you set up a local HTTPS proxy.

## Prerequisites

### Install mkcert (macOS)

```bash
brew install mkcert
```

### Create SSL Certificate

```bash
# Install local CA
mkcert -install

# Create certificate for localhost
mkcert localhost
```

This will create two files in your current directory:
- `localhost.pem` (certificate)
- `localhost-key.pem` (private key)

**Important:** Move these files to the root of your project:

```bash
mv localhost.pem localhost-key.pem /path/to/your/project/
```

## Install local-ssl-proxy

```bash
npm install -g local-ssl-proxy
```

## Running the Proxy

### Manual Method

```bash
# Start Next.js dev server (HTTP on port 3000)
npm run dev

# In another terminal, start the HTTPS proxy
local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
```

### Using npm Scripts (Recommended)

We've added scripts to make this easier:

```bash
# Start both dev server and HTTPS proxy
npm run dev:https
```

This will:
1. Start Next.js on `http://localhost:3000`
2. Start HTTPS proxy on `https://localhost:3010`

## URLs

- **Development (HTTP):** http://localhost:3000
- **Storyblok Editor (HTTPS):** https://localhost:3010

## Configure Storyblok

1. Go to your Storyblok space settings
2. Navigate to **Visual Editor**
3. Set the preview URL to: `https://localhost:3010`

## Troubleshooting

### Certificate Errors

If you see certificate warnings:
1. Make sure you ran `mkcert -install`
2. Restart your browser
3. Try accessing `https://localhost:3010` directly first

### Port Already in Use

If port 3010 is already in use, change the `--source` port:

```bash
local-ssl-proxy --source 3011 --target 3000 --cert localhost.pem --key localhost-key.pem
```

### Proxy Not Working

1. Make sure the dev server is running first
2. Check that certificate files exist in project root
3. Verify the target port (3000) matches your dev server

## Security Note

- The certificates are for **local development only**
- Add `*.pem` to `.gitignore` to avoid committing certificates
- Never use these certificates in production
