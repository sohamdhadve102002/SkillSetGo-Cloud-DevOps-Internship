# 🐳 Docker Week 2.1 — Dockerfile Creation

A beginner-level Docker project created as part of the **Skill Set Go EduTech Cloud & DevOps Internship Program**.

This project demonstrates how to create a simple Node.js application, create a Dockerfile, build a Docker image, run a Docker container, and deploy the application on an **AWS EC2 Ubuntu instance**.

---

## 📌 Project Overview

The objective of this project is to understand the basic Docker workflow:

```text
Node.js Application
        ↓
    Dockerfile
        ↓
   Docker Image
        ↓
 Docker Container
        ↓
    AWS EC2
        ↓
 Web Application
```

---

## 🎯 Objectives

- Understand basic Docker concepts
- Create a Dockerfile
- Create a Docker image
- Run an application inside a Docker container
- Understand Docker port mapping
- Deploy a containerized application on AWS EC2
- Verify the application through a web browser
- Push the project to GitHub

---

## 🛠️ Technologies Used

- **AWS EC2**
- **Ubuntu Linux**
- **Docker**
- **Docker Compose**
- **Node.js**
- **JavaScript**
- **Git & GitHub**

---

## 📁 Project Structure

```text
2.1-Dockerfile-Creation/
│
├── Docker-Hello-From-Docker/
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
│
├── Screenshots/
│   ├── 01-EC2-Instance.png
│   ├── 02-EC2-OS-Info.png
│   ├── 03-SSH-Connection.png
│   ├── 04-Docker-Version.png
│   ├── 05-Create-Project-Folder.png
│   ├── 06-Create-Files.png
│   ├── 07-Show-All-Docker-Files.png
│   ├── 08-Docker-Machine-Key-Creation.png
│   ├── 09-Docker-Image-Build.png
│   ├── 10-Docker-Image-Check.png
│   ├── 11-Give-User-Permission.png
│   ├── 12-Check-Container.png
│   ├── 13-Container-Logs.png
│   ├── 14-Update-Security-Group.png
│   ├── 15-Docker-Container-Running.png
│   ├── 16-EC2-OS-Info.png
│   ├── 17-Project-Output.png
│   └── 18-Docker-Hello-From-Docker.png
│
└── README.md

```

---

## 💻 Application

This project uses a simple Node.js HTTP server.

The application runs on:

```text
Port: 3000
```

When the application is successfully deployed, it displays:

```text
2.1 Dockerfile Creation

Hello from my Docker container!

Cloud & DevOps - Skill Set Go EduTech
```

---

# 🐳 Dockerfile

The Dockerfile contains the instructions required to create the Docker image.

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🔍 Dockerfile Explanation

### 1. FROM

```dockerfile
FROM node:22-alpine
```

Uses Node.js 22 Alpine Linux as the base image.

---

### 2. WORKDIR

```dockerfile
WORKDIR /app
```

Creates and sets `/app` as the working directory inside the container.

---

### 3. COPY package files

```dockerfile
COPY package*.json ./
```

Copies the Node.js package files into the container.

---

### 4. Install dependencies

```dockerfile
RUN npm install
```

Installs the dependencies required by the application.

---

### 5. Copy application files

```dockerfile
COPY . .
```

Copies the application source code into the container.

---

### 6. EXPOSE

```dockerfile
EXPOSE 3000
```

Documents that the application uses port `3000`.

---

### 7. CMD

```dockerfile
CMD ["npm", "start"]
```

Starts the Node.js application when the container runs.

---

# 🚀 Installation & Setup

## 1. Connect to AWS EC2

Connect to the Ubuntu EC2 instance using SSH:

```bash
ssh -i "Skill-Set-Go-Docker_Machine_Key.pem" ubuntu@3.81.160.197:3000
```

---

## 2. Update Ubuntu

```bash
sudo apt update
```

```bash
sudo apt upgrade -y
```

---

## 3. Install Docker

Install the required packages:

```bash
sudo apt install -y ca-certificates curl
```

Create Docker's keyring directory:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

Download Docker's official GPG key:

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

Set the correct permissions:

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Add the Docker repository:

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Update the package list:

```bash
sudo apt update
```

Install Docker:

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## 4. Verify Docker

Check Docker version:

```bash
docker --version
```

Check Docker Compose:

```bash
docker compose version
```

Test Docker:

```bash
sudo docker run hello-world
```

---

# 📦 Build Docker Image

Navigate to the project directory:

```bash
cd 2.1 Dockerfile Creation
```

Build the Docker image:

```bash
docker build -t 2.1 Dockerfile Creation .
```

Check the created image:

```bash
docker images
```

Expected image:

```text
2.1 Dockerfile Creation
```

---

# ▶️ Run Docker Container

Run the container:

```bash
docker run -d -p 3000:3000 --name docker-week2-container 2.1 Dockerfile Creation
```

Check the running container:

```bash
docker ps
```

Expected port mapping:

```text
0.0.0.0:3000->3000/tcp
```

---

# 🌐 AWS EC2 Security Group

To access the application from the internet, add an inbound rule to the EC2 Security Group.

### Inbound Rule

```text
Type: Custom TCP
Port: 3000
Source: 0.0.0.0/0
```

> For production environments, access should be restricted instead of allowing `0.0.0.0/0`.

---

# 🌍 Access the Application

Open a web browser and enter:

```text
http://3.81.160.197:3000
```

Example:

```text
http://3.81.160.197:3000
```

The application should display:

```text
Docker Week 2 Project

Hello from my Docker container!

Cloud & DevOps - Skill Set Go EduTech
```

---

# 📋 Useful Docker Commands

### Check running containers

```bash
docker ps
```

### Check all containers

```bash
docker ps -a
```

### Check Docker images

```bash
docker images
```

### View container logs

```bash
docker logs docker-week2-container
```

### Stop container

```bash
docker stop docker-week2-container
```

### Start container

```bash
docker start docker-week2-container
```

### Restart container

```bash
docker restart docker-week2-container
```

### Remove container

```bash
docker rm docker-week2-container
```

### Remove image

```bash
docker rmi 2.1 Dockerfile Creation
```

---

# 🔄 Docker Workflow

```text
Write Application
       ↓
Create Dockerfile
       ↓
docker build
       ↓
Docker Image
       ↓
docker run
       ↓
Docker Container
       ↓
Port Mapping
       ↓
AWS EC2
       ↓
Web Browser
```

---

# 📸 Project Evidence

The following evidence was collected during the project:

- AWS EC2 SSH connection
- Ubuntu version
- Docker installation
- Docker version
- Docker Compose version
- `docker run hello-world`
- Dockerfile
- Node.js application
- Successful Docker image build
- Docker image listing
- Running Docker container
- AWS Security Group configuration
- Application running in browser
- Docker container logs

---

# 🎓 Learning Outcome

Through this project, I learned:

- Basic Linux administration on AWS EC2
- Docker installation on Ubuntu
- Docker images and containers
- Dockerfile structure
- Docker image creation
- Container execution
- Docker port mapping
- Docker logs
- AWS EC2 Security Groups
- Deploying a containerized application on AWS EC2
- Basic GitHub project documentation

---

# 👨‍💻 Author

**Soham Dhadve**

Cloud & DevOps Learner

### Program

**Skill Set Go EduTech — Cloud & DevOps Internship Program 2026**

### Task

**Week 2 — Task 2.1: Dockerfile Creation**

---

## ⭐ Future Improvements

This project will be extended in the upcoming tasks to include:

- Containerizing a frontend/backend application
- Docker Compose
- Multi-container architecture
- Docker Hub
- GitHub Actions CI/CD
- Kubernetes
- Terraform
- Automated deployment
- Monitoring and logging

---

## 📚 Week 2 Progress

| Task | Status |
|---|---|
| 2.1 Dockerfile Creation | ✅ Completed |
| 2.2 Containerize Backend/Frontend | ⏳ Upcoming |
| 2.3 Docker Compose | ⏳ Upcoming |
| 2.4 Publish to Docker Hub | ⏳ Upcoming |

---

**Skill Set Go EduTech — Learn. Build. Prove.**