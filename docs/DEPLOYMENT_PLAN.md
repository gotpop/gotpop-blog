# AWS Deployment Plan for gotpop.io

## Architecture Overview

**Network Structure:**

- Public subnets: EC2 instances (need internet access for updates/SSL)
- Private subnets: RDS database (no direct internet access)
- Database subnet group: Spans 2 AZs for RDS requirements

**Simple Setup:**

- Two public subnets: EC2 blog + EC2 portfolio (with Elastic IPs)
- Two private subnets: RDS primary + standby (required by AWS)
- No NAT Gateway needed: EC2s are in public subnets, RDS doesn't need internet

**Security Groups:**

- EC2 SG: HTTP/HTTPS from internet, SSH from your IP
- RDS SG: Port 5432 from EC2 security groups only
- Lambda SG: Access to RDS (if Lambda functions need database)

**Cost Impact:**

- RDS db.t3.micro: ~$13/month (free tier eligible)
- No additional networking costs: Private subnets are free, no NAT Gateway needed

## Implementation Steps

### Phase 1: VPC Foundation ⏱️ ~30 minutes ✅ COMPLETED BY WIZARD

1. ✅ **Create custom VPC** with CIDR block (10.0.0.0/16)
2. ✅ **Create 4 subnets** across 2 availability zones:
   - 2 public subnets for EC2 instances
   - 2 private subnets for RDS database
3. ✅ **Set up Internet Gateway** and attach to VPC
4. ✅ **Configure route tables** for public subnets to route traffic through IGW
5. **Create security groups** for EC2 and RDS with proper rules

### Phase 2: EC2 Instances ⏱️ ~45 minutes

1. **Launch blog EC2** (t3.micro) in first public subnet
2. **Launch portfolio EC2** (t3.micro) in second public subnet
3. **Allocate and associate** Elastic IPs to both instances
4. **Configure SSH access** with key pairs
5. **Test connectivity** to both instances

### Phase 3: Database Setup ⏱️ ~30 minutes

1. **Create RDS subnet group** using the 2 private subnets
2. **Launch RDS PostgreSQL instance** (db.t3.micro)
3. **Configure database security group** to allow access from EC2 security groups only
4. **Create database** and initial user credentials
5. **Test database connectivity** from EC2 instances

### Phase 4: DNS Configuration ⏱️ ~20 minutes

1. **Create Route 53 hosted zone** for gotpop.io
2. **Add A records**: gotpop.io → Blog Elastic IP, work.gotpop.io → Portfolio Elastic IP
3. **Update domain registrar** nameservers to point to Route 53
4. **Verify DNS propagation** for both domains

### Phase 5: Application Deployment ⏱️ ~60-90 minutes

1. **Install prerequisites** on both EC2 instances (Node.js, Nginx, PM2)
2. **Deploy blog application** to blog EC2 instance
3. **Deploy portfolio application** to portfolio EC2 instance
4. **Configure Nginx** for SSL and reverse proxy on both instances
5. **Set up SSL certificates** using Let's Encrypt
6. **Configure applications** to connect to RDS database

### Phase 6: Shared Services (Later) ⏱️ ~45 minutes

1. **Create Lambda functions** for email and shared services
2. **Set up API Gateway** endpoints
3. **Configure SES** for email delivery
4. **Update applications** to use shared Lambda services

## Estimated Timeline

- **Phases 1-5**: 2-4 hours (core infrastructure and applications)
- **Phase 6**: Additional 1 hour (shared services)
- **Total**: 3-5 hours depending on experience level

## Prerequisites Checklist

- [ ] AWS Account with appropriate permissions
- [ ] AWS CLI configured with credentials
- [ ] SSH key pair created for EC2 access
- [ ] Domain gotpop.io registered and accessible
- [ ] Blog application ready for deployment
- [ ] Portfolio application ready for deployment
- [ ] Basic understanding of VPC, EC2, and RDS concepts

## Success Criteria

- [ ] Both applications accessible via their respective domains
- [ ] HTTPS working on both sites
- [ ] Database connectivity established from both EC2 instances
- [ ] DNS resolution working for both domains
- [ ] Security groups properly configured
- [ ] SSL certificates installed and auto-renewing

## Rollback Plan

- **DNS Issues**: Revert Route 53 records to previous configuration
- **Application Issues**: Use Elastic IP directly while troubleshooting
- **Database Issues**: Applications can run without database initially
- **Infrastructure Issues**: Terminate resources and restart from Phase 1

## Post-Deployment Tasks

- [ ] Set up CloudWatch monitoring
- [ ] Configure automated backups for RDS
- [ ] Set up log rotation on EC2 instances
- [ ] Document database schema and API endpoints
- [ ] Create maintenance procedures documentation
- [ ] Set up cost alerts in AWS Billing

## Future Enhancements

- Application Load Balancer for better traffic distribution
- Auto Scaling Groups for high availability
- CloudFront CDN for improved performance
- ElastiCache for application caching
- AWS Systems Manager for server management
- CI/CD pipeline for automated deployments
