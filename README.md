# 🛠️ Full-Stack AWS CI/CD Deployment Project

This project demonstrates the deployment of a full-stack web application using AWS services and CI/CD best practices. It automates the build, test, and deployment of both frontend and backend applications onto EC2 instances across multiple availability zones, with a robust MySQL backend powered by Amazon RDS.

---

## 📁 Project Structure

- **Frontend**: React.js hosted on EC2 via NGINX (Web Tier)
- **Backend**: Node.js with PM2 on EC2 (Application Tier)
- **Database**: RDS MySQL with Multi-AZ for high availability (Data Tier)
- **CI/CD**: Automated pipelines using AWS CodePipeline, CodeBuild, and CodeDeploy

---

## 🛠️ Tools & Services Used 

### 🧰 GitHub
-  Source control and collaboration.
-  Triggers the CI/CD pipeline when a new commit or release is pushed.

### 🏗️ AWS CodeBuild
-  Compiles code and builds artifacts.
-  Executes `buildspec.yml` to install dependencies, run tests, and prepare artifacts.

### 🚀 AWS CodeDeploy
-  Handles automated deployment.
-  Deploys build artifacts to EC2 using `appspec.yml`, manages app lifecycle hooks.

### 🔁 AWS CodePipeline
-  Orchestrates CI/CD flow.
-  Connects GitHub → CodeBuild → CodeDeploy in a repeatable and visualized pipeline.

### 🖥️ Amazon EC2
-  Hosting for frontend and backend.
-  EC2 instances (in private subnets) run React on NGINX (frontend) and Node.js with PM2 (backend).

### 🗄️ Amazon RDS (MySQL)
-  Managed relational database.
-  MySQL database used by the backend to store persistent application data.

#### 💡 Key RDS Features Used:
- **Multi-AZ Deployment**: One primary instance and one standby for high availability.
- **Automatic Backups**: Enabled for data protection.
- **Data Replication**: Ensures failover readiness.
- **Private Subnet Deployment**: RDS runs in isolated, secure private subnets (no public exposure).
- **IAM Authentication & Security Groups**: Controls access to RDS only from backend EC2 instances.
![Image alt](https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/frontend-pipeline-flow.png)

<p align="center">
  <img src="https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/images/frontend_pipeline.png?raw=true" alt="Frontend Pipeline" width="100%" />
  <img src="https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/images/backend_pipeline.png?raw=true" alt="Backend Pipeline" width="100%" />
</p>

---

## 🔄 CI/CD Pipeline Flow

1. **Source Stage**  
    - GitHub triggers pipeline automatically (on commit or release).
    - Source code is pulled into CodePipeline.

2. **Build Stage**  
    - CodeBuild executes `buildspec.yml` to build, test, and store artifacts.

3. **Deploy Stage**  
    - CodeDeploy deploys artifacts to EC2 using `appspec.yml`.

4. **Database Connection**  
    - Backend (Node.js) securely connects to RDS MySQL via VPC private subnet using credentials managed in Secrets Manager or environment variables.
![Image alt](https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/CI%3ACD-Pipeline-flow.png)
---

## 🏗️ Infrastructure Overview

### Architecture Highlights:
- **Frontend (React + NGINX)** in EC2 across AZs.
- **Backend (Node.js + PM2)** in EC2, accesses MySQL.
- **Database Tier**: Amazon RDS MySQL with automatic failover and backups.
- **Load Balancing**: Application Load Balancer (ALB) spans both AZs.
- **VPC Configuration**:
  - Public Subnet: Bastion Host
  - Private Subnets: App + DB tiers for isolation
- **Monitoring**: CloudWatch Logs + Alarms
![Image alt](https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/3-tier-architecture.png)

---

## 🔐 Setting up Parameters in AWS Systems Manager (SSM) Parameter Store

To follow security best practices, sensitive backend environment variables like database credentials are securely stored in **AWS Systems Manager Parameter Store**. These parameters are referenced during the build and deployment process via the `buildspec.yml` file.

### 🛠 Parameters Used

In the `backend/buildspec.yml` file, the following SSM parameter references are defined under `parameter-store`:

```yaml
parameter-store:
  DB_PASSWORD: "/nodeapp/db/password"
  DB_HOST: "/nodeapp/db/hostname"
  DB_PORT: "/nodeapp/db/port"
  DB_USER: "/nodeapp/db/user"
  DB_NAME: "/nodeapp/db/name"
```
![Image alt](https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/images/parameters.png)

---

## 🔐 Security Features

- **RDS in Private Subnets**: Database isn't publicly accessible.
- **Bastion Host**: Acts as a secure entry point into the VPC.
- **IAM Roles**: Enforce least-privilege access for services.
- **Security Groups**: Control inbound/outbound access (e.g., backend can talk to RDS, frontend cannot).
- **HTTPS with ACM**: End-to-end encrypted traffic via CloudFront.
- **CloudWatch**: Logs and monitors infrastructure health and alerts anomalies.
- **Multi-AZ RDS**: Provides fault tolerance for the database tier.

---

## ⚙️ Scalability & Reliability

- **Multi-AZ Redundancy**: EC2, RDS spread across two AZs.
- **Auto Scaling Groups (Optional)**: Scales app servers based on demand.
- **Load Balancing**: Distributes frontend/backend requests.
- **Database Failover**: RDS promotes standby if primary fails.

---

## 📈 CI/CD Benefits

| Feature | Before | After |
|--------|--------|-------|
| Deployment | Manual | Fully Automated |
| Downtime | Often | Zero-downtime |
| Error Rate | Higher | Reduced with rollback support |
| Speed | Slower | Frequent, faster releases |
| Monitoring | Minimal | Full logging, alarms & rollback logic |

---

## 🚀 Final Output

After successfully setting up the CI/CD pipeline and deploying the infrastructure on AWS, the final application is live and fully functional.

### 📚 Project Overview

The deployed website is a **Books & Authors Management App** that allows users to:

- View books and authors in a user-friendly interface
- Insert new books and authors into the database
- Fetch and display data dynamically from the backend

### ⚙️ How It Works

- The **frontend** (React + NGINX) interacts with the **backend** (Node.js + Express) through REST APIs.
- The **backend** handles business logic and connects to the **RDS MySQL** database to perform CRUD operations.
- All data (books/authors) is stored securely in the **MySQL RDS instance**.

![Image alt](https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/images/webpage_dashboard.png)
![Image alt](https://github.com/Sunil-3012/AWS-CICD-Pipeline/blob/main/images/webpage_authors.png)

---

---

## 🧪 Future Enhancements

- Migrate to container-based deployments (ECS/EKS).
- Add WAF + Shield for advanced protection.
- CI with test coverage metrics.
- Enable RDS performance insights.

---

## 📜 Author

*Sunil Gangupamu*  
*[Linkedin](https://www.linkedin.com/in/sunil-gangupamu-16487b227/)*

---



