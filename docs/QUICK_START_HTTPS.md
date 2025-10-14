# Quick Start: HTTPS Proxy for Storyblok

## One-Time Setup

Run the setup script:

```bash
./scripts/setup-https.sh
```

Then install the proxy tool globally:

```bash
npm install -g local-ssl-proxy
```

## Daily Usage

### Option 1: Start Everything Together (Recommended)

```bash
npm run dev:https
```

This starts both the Next.js dev server (port 3000) and HTTPS proxy (port 3010).

### Option 2: Run Separately

Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
npm run proxy
```

## Access Your Site

- **Local Development:** http://localhost:3000
- **Storyblok Visual Editor:** https://localhost:3010

## Storyblok Configuration

In your Storyblok space:
1. Go to **Settings** → **Visual Editor**
2. Set **Preview URL** to: `https://localhost:3010`

## Troubleshooting

See [HTTPS_PROXY_SETUP.md](./HTTPS_PROXY_SETUP.md) for detailed troubleshooting.
