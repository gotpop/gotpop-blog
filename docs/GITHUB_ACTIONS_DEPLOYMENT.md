# GitHub Actions Deployment Guide

## Step-by-Step Deployment with Node.js 22.20.0

This guide covers deploying a Next.js application to AWS EC2 with automated GitHub Actions CI/CD pipeline.

### Prerequisites

- ✅ EC2 instance running in public subnet
- ✅ Security group configured for HTTP/HTTPS/SSH access
- ✅ SSH key pair for EC2 access
- ✅ GitHub repository with Next.js application

### Step 1: Prepare EC2 Instance

SSH to your EC2 instance and run these commands:

```bash
# Update system
sudo yum update -y

# Install Node.js 22.20.0
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs git

# Verify Node.js version
node --version  # Should show v22.x.x

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo yum install -y nginx
```

### Step 2: Clone Repository on EC2

```bash
# Navigate to web directory
cd /var/www

# Clone your repository (replace with your GitHub URL)
sudo git clone https://github.com/gotpop/gotpop-blog.git
sudo chown -R ec2-user:ec2-user gotpop-blog

# Enter project directory
cd gotpop-blog

# Install dependencies
npm ci

# Build the project
npm run build
```

### Step 3: Create Environment File

```bash
# Create production environment file
cat > .env.production << EOF
NODE_ENV=production
STORYBLOK_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_token_here
PORT=3000
EOF
```

### Step 4: Start Application with PM2

```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'gotpop-blog',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Step 5: Configure Nginx

```bash
# Create Nginx config
sudo cat > /etc/nginx/conf.d/gotpop.conf << EOF
server {
    listen 80;
    server_name gotpop.io www.gotpop.io;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Step 6: Create GitHub Actions Workflow

In your local repository, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ec2-user
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /var/www/gotpop-blog
            git pull origin main
            npm ci
            npm run build
            pm2 restart gotpop-blog
```

### Step 7: Set Up GitHub Secrets

1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**:
   - Name: `EC2_HOST`, Value: `YOUR_ELASTIC_IP`
   - Name: `EC2_SSH_KEY`, Value: [paste contents of your .pem file]

### Step 8: Set Up Route 53 (Optional)

1. **AWS Console** → **Route 53** → **Hosted zones**
2. **Create hosted zone** for your domain
3. **Create A record**: Name: blank, Value: `YOUR_ELASTIC_IP`

### Step 9: Test Deployment

1. Make a change to your application
2. Commit and push to main branch
3. Check **Actions** tab in GitHub to monitor deployment
4. Visit your domain or Elastic IP to verify deployment

### Step 10: Add SSL Certificate (Optional)

```bash
# Install Certbot
sudo yum install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Configuration for Different Applications

### For Portfolio Application

When setting up the portfolio, modify the following:

**Repository Clone:**

```bash
sudo git clone https://github.com/gotpop/gotpop-portfolio.git
```

**PM2 Ecosystem (different port):**

```javascript
module.exports = {
  apps: [
    {
      name: "gotpop-portfolio",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001, // Different port
      },
    },
  ],
}
```

**Nginx Config (different domain/port):**

```nginx
server {
    listen 80;
    server_name work.gotpop.io;

    location / {
        proxy_pass http://localhost:3001;  # Different port
        # ... rest of config same
    }
}
```

**GitHub Actions Script:**

```bash
cd /var/www/gotpop-portfolio
git pull origin main
npm ci
npm run build
pm2 restart gotpop-portfolio
```

## Troubleshooting

### Common Issues

**Node.js Version Issues:**

```bash
# Check current version
node --version
npm --version

# Reinstall if needed
sudo yum remove -y nodejs npm
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs
```

**PM2 Process Issues:**

```bash
# Check PM2 status
pm2 status
pm2 logs

# Restart all processes
pm2 restart all

# Stop and start specific app
pm2 stop gotpop-blog
pm2 start gotpop-blog
```

**Nginx Issues:**

```bash
# Check Nginx status
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check logs
sudo tail -f /var/log/nginx/error.log
```

**GitHub Actions Debugging:**

- Check Actions tab in GitHub repository
- Verify secrets are correctly set
- Ensure SSH key has proper permissions
- Test SSH connection manually

### Performance Monitoring

**Check Application Status:**

```bash
# PM2 monitoring
pm2 monit

# System resources
htop
df -h
free -m
```

**Log Management:**

```bash
# PM2 logs
pm2 logs --lines 50

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

## Estimated Timeline

- **Server Setup**: 30 minutes
- **Application Deployment**: 20 minutes
- **Nginx Configuration**: 15 minutes
- **GitHub Actions Setup**: 15 minutes
- **DNS Configuration**: 10 minutes
- **SSL Setup**: 10 minutes
- **Total**: ~100 minutes

## Next Steps

After successful deployment:

- [ ] Set up monitoring and alerting
- [ ] Configure log rotation
- [ ] Implement backup strategy
- [ ] Set up staging environment
- [ ] Add performance optimization
- [ ] Configure CDN (CloudFront)

## Notes

- **Node.js 22.20.0** is compatible with Next.js 15.5.4 and resolves engine warnings
- **PM2** ensures application stays running and auto-restarts on crashes
- **Nginx** provides reverse proxy and can handle SSL termination
- **GitHub Actions** provides free CI/CD with 2,000 minutes/month for public repos
- **Security groups** must allow HTTP (80) and HTTPS (443) traffic for web access
