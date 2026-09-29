# 1.3 Basic Cloud Deployment

## 📌 Objective

The objective of this task is to deploy a static website to the AWS Cloud and understand the basic cloud deployment process.

For this exercise, a static HTML, CSS, and JavaScript website was deployed using **Amazon S3 Static Website Hosting**.

---

# ☁️ Cloud Platform

**Cloud Provider:** Amazon Web Services (AWS)

**AWS Service:** Amazon S3

**Deployment Type:** Static Website Hosting

**AWS Region:** `ap-south-1 (Mumbai)`

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Amazon S3
- AWS Management Console
- Web Browser

---

# 🌐 Website Structure

The website contains multiple static pages along with CSS, JavaScript, and asset files.

### Website Pages

- `index.html` — Home Page
- `about.html` — About Page
- `services.html` — Services Page
- `reviews.html` — Reviews Page
- `contact.html` — Contact Page
- `error.html` — Error Page

### Website Resources

- `assets/` — Images and other website assets
- `css/` — CSS stylesheets
- `js/` — JavaScript files

---

# 📂 Project Structure

```text
1.3-Basic-Cloud-Deployment/
│
├── Website/
│   │
│   ├── assets/
│   │
│   ├── css/
│   │
│   ├── js/
│   │
│   ├── about.html
│   ├── contact.html
│   ├── error.html
│   ├── index.html
│   ├── reviews.html
│   └── services.html
│
├── Screenshots/
│   │
│   ├── 01-Website-Structure.png
│   ├── 02-Region-Selection.png
│   ├── 03-Bucket-Create-Step-1.png
│   ├── 04-Bucket-Create-Step-2.png
│   ├── 05-Bucket-Create-Step-3.png
│   ├── 06-Upload-Files-Folder-Inside-Bucket.png
│   ├── 07-Enable-Static-Website-Hosting.png
│   ├── 08-Add-Bucket-Policy.png
│   ├── 09-Website-Output-1.png
│   ├── 10-Website-Output-2.png
│   └── 11-Website-Full-Video.png
│
└── README.md
```

---

# 🚀 Deployment Process

## Step 1: Create the Static Website

A static website was created using HTML, CSS, and JavaScript.

The website contains multiple pages:

```text
index.html
about.html
services.html
reviews.html
contact.html
error.html
```

The required CSS, JavaScript, and asset files are stored inside their respective directories.

---

## Step 2: Test the Website Locally

Before deployment, the website was tested locally.

The following were checked:

- Homepage
- About page
- Services page
- Contact page
- reviews page
- error page
- Navigation links
- CSS styling
- JavaScript functionality
- Images and other assets

---

## Step 3: Create an Amazon S3 Bucket

An S3 bucket was created using the AWS Management Console.

### Bucket Configuration

**Bucket Name:**

```text
soham-basic-cloud-deployment-2026-931680508668-ap-south-1-an
```

**AWS Region:**

```text
ap-south-1
```

**Region Name:**

```text
Asia Pacific (Mumbai)
```

The S3 bucket was created successfully.

---

## Step 4: Files and Folder Structure

The complete website was uploaded to the S3 bucket.

The following structure was uploaded:

```text
1.3-Basic-Cloud-Deployment/
│
├── Website/
│   │
│   ├── assets/
│   │
│   ├── css/
│   │
│   ├── js/
│   │
│   ├── about.html
│   ├── contact.html
│   ├── error.html
│   ├── index.html
│   ├── reviews.html
│   └── services.html
│
├── Screenshots/
│   │
│   ├── 01-Website-Structure.png
│   ├── 02-Region-Selection.png
│   ├── 03-Bucket-Create-Step-1.png
│   ├── 04-Bucket-Create-Step-2.png
│   ├── 05-Bucket-Create-Step-3.png
│   ├── 06-Upload-Files-Folder-Inside-Bucket.png
│   ├── 07-Enable-Static-Website-Hosting.png
│   ├── 08-Add-Bucket-Policy.png
│   ├── 09-Website-Output-1.png
│   ├── 10-Website-Output-2.png
│   └── 11-Website-Full-Video.png
│
└── README.md
```

---

## Step 5: Enable Static Website Hosting

Static website hosting was enabled for the S3 bucket.

### Index Document

```text
index.html
```

The `index.html` file is configured as the main entry point for the website.

---

## Step 6: Configure Website Access

The required S3 website access configuration was applied so that the website could be accessed through the S3 website endpoint.

> Access permissions should be configured carefully and only the required access should be provided.

---

## Step 7: Obtain the Website Endpoint

After configuring Static Website Hosting, the S3 website endpoint was obtained from the AWS Management Console.

### Live Website URL

```text
http://soham-basic-cloud-deployment-2026-931680508668-ap-south-1-an.s3-website.ap-south-1.amazonaws.com/
```

Replace the placeholder with the actual AWS S3 website endpoint.

---

# 🧪 Step 8: Test the Deployed Website

The deployed website was opened using the S3 website endpoint.

The following were tested:

- Home page
- About page
- Services page
- Reviews page
- Contact page
- error page
- Navigation
- CSS styling
- JavaScript
- Images and assets

---

# 🔍 Deployment Verification

The deployment was verified using the AWS S3 website endpoint.

### Verification Checklist

- [x] Static website created
- [x] S3 bucket created
- [x] Website files uploaded
- [x] `index.html` configured as the index document
- [x] Static website hosting enabled
- [x] Website access configured
- [x] S3 website endpoint generated
- [x] Homepage tested
- [x] About page tested
- [x] Services page tested
- [x] Reviews page tested
- [x] Contact page tested
- [x] CSS tested
- [x] JavaScript tested
- [x] Website assets tested

---

# 🏗️ Deployment Architecture & Workflow

```text
                         DEPLOYMENT WORKFLOW
                                 │
                                 ▼
                    Create Static Website
                                 │
                                 ▼
                     Test Website Locally
                                 │
                                 ▼
                       Select AWS Region
                                 │
                                 ▼
                         Create S3 Bucket
                                 │
                                 ▼
                     Upload Website Files
                                 │
                                 ▼
                  Amazon S3 Static Website
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
           index.html       about.html       services.html
                │
                ├───────────────┬────────────────┐
                │               │                │
                ▼               ▼                ▼
          reviews.html    contact.html      error.html
                │
                ├── css/
                ├── js/
                └── assets/
                                 │
                                 ▼
                 Enable Static Website Hosting
                                 │
                                 ▼
                    Configure Index Document
                                 │
                                 ▼
                    Configure Error Document
                                 │
                                 ▼
                    Configure Website Access
                                 │
                                 ▼
                     Configure Bucket Policy
                                 │
                                 ▼
                   Obtain S3 Website Endpoint
                                 │
                                 ▼
                         Open Live Website
                                 │
                                 ▼
                      Test Website Pages
                                 │
                                 ▼
                    Test Custom Error Page
                                 │
                                 ▼
                      Deployment Completed


# 🔄 Deployment Workflow

```text
User
 │
 │ HTTP Request
 ▼
Amazon S3 Static Website
 │
 ├── index.html
 ├── about.html
 ├── services.html
 ├── reviews.html
 ├── contact.html
 ├── error.html
 │
 ├── css/
 ├── js/
 └── assets/
 │
 ▼
Live Static Website
```

---

# 📸 Deployment Evidence

The following screenshots provide evidence of the deployment process:

| No. | Screenshot Name | Description |
|---|---|---|
| 1 | `01-Website-Structure.png` | Local website project structure |
| 2 | `02-S3-Bucket-Created.png` | S3 bucket successfully created |
| 3 | `03-S3-Static-Website-Hosting.png` | Static website hosting configuration |
| 4 | `04-S3-Website-Permissions.png` | Website access/permissions configuration |
| 5 | `05-S3-Files-Uploaded.png` | Website files uploaded to S3 |
| 6 | `06-S3-Website-URL.png` | S3 website endpoint |
| 7 | `07-Live-Website.png` | Successfully deployed website |
| 8 | `08-Website-Pages-Tested.png` | Website pages tested successfully |

---

# 🧠 Key Learnings

During this exercise, I learned:

- How to deploy a static website to AWS
- How to create an Amazon S3 bucket
- How to upload website files to S3
- How S3 Static Website Hosting works
- How to configure an index document
- How to configure website access
- How to obtain an S3 website endpoint
- How to test a cloud-hosted static website
- How HTML, CSS, JavaScript, and assets work together after deployment
- Basic cloud deployment workflow

---

# 📦 Deliverable

**Task:** 1.3 Basic Cloud Deployment

**Cloud Provider:** AWS

**AWS Service:** Amazon S3

**Deployment Type:** Static Website Hosting

**Deliverable:** Live URL + Deployment Notes

### Live URL
```text
http://soham-basic-cloud-deployment-2026-931680508668-ap-south-1-an.s3-website.ap-south-1.amazonaws.com/
```

### Google Drive Screen-Recording Video URL
```text
https://drive.google.com/file/d/1BfsGAZk0IXsCm6JoBKT1KND_4dJekbhz/view?usp=sharing
```

---


# ✅ Status

**Task:** 1.3 Basic Cloud Deployment

**Cloud Provider:** AWS

**AWS Service:** Amazon S3

**Status:** Completed