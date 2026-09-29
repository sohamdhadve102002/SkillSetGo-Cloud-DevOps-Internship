# 1.4 Architecture Documentation

## Skill Set Go – Cloud & DevOps Internship

### Week 1 – Cloud & Linux Foundations

---

## 1. Objective

The objective of this practical is to document the cloud deployment architecture and deployment process completed as part of Week 1 of the Skill Set Go Cloud & DevOps Internship.

This practical documents the complete request flow from the user and web browser through DNS resolution, Internet routing, TCP connection, HTTPS/TLS communication, Amazon S3 static website hosting, and finally browser rendering.

---

## 2. Project Overview

### Project Name

AWS S3 Static Website Deployment

### Cloud Platform

Amazon Web Services (AWS)

### AWS Service Used

Amazon S3

### Deployment Type

Static Website Hosting

### Website Technologies

- HTML
- CSS
- JavaScript
- Images / Static Assets

---

## 3. Architecture Overview

The static website is deployed using Amazon S3.

The website files are stored inside an Amazon S3 bucket and served as a static website.

The overall architecture follows this flow:

```text
┌──────────────────────────────┐
│        1. USER               │
│                              │
│ Types:                       │
│ https://www.example.com      │
└──────────────┬───────────────┘
               │
               │ URL Request
               ▼
┌──────────────────────────────┐
│       2. WEB BROWSER         │
│                              │
│ Chrome / Edge / Firefox      │
│                              │
│ Checks browser DNS cache     │
│ Checks OS DNS cache          │
└──────────────┬───────────────┘
               │
               │ DNS Lookup
               ▼
┌──────────────────────────────┐
│     3. DNS RESOLVER         │
│                              │
│ ISP / Google / Cloudflare    │
│ Recursive DNS Resolver       │
└──────────────┬───────────────┘
               │
               │ Cache Miss
               ▼
┌──────────────────────────────┐
│       4. ROOT DNS            │
│                              │
│ Root DNS Server              │
│                              │
│ "I don't know the IP, but    │
│  I know who handles .com"    │
└──────────────┬───────────────┘
               │
               │ .com Referral
               ▼
┌──────────────────────────────┐
│       5. TLD DNS             │
│                              │
│ .COM TLD DNS Server          │
│                              │
│ Finds authoritative DNS      │
│ server for example.com       │
└──────────────┬───────────────┘
               │
               │ Authoritative DNS
               ▼
┌──────────────────────────────┐
│    6. AUTHORITATIVE DNS      │
│                              │
│ example.com DNS Server       │
│                              │
│ Returns IP Address           │
│ Example: 203.0.113.10        │
└──────────────┬───────────────┘
               │
               │ IP Address
               ▼
┌──────────────────────────────┐
│      7. DNS RESOLVER         │
│                              │
│ Returns IP to browser        │
└──────────────┬───────────────┘
               │
               │ IP Address
               ▼
┌──────────────────────────────┐
│        8. INTERNET           │
│                              │
│ Routers / ISP / Networks     │
│                              │
│ Determines route to          │
│ destination IP               │
└──────────────┬───────────────┘
               │
               │ IP Routing
               ▼
┌──────────────────────────────┐
│       9. TCP CONNECTION      │
│                              │
│ TCP 3-Way Handshake          │
│                              │
│ SYN                          │
│ SYN-ACK                      │
│ ACK                          │
└──────────────┬───────────────┘
               │
               │ Connection Ready
               ▼
┌──────────────────────────────┐
│      10. HTTPS / TLS         │
│                              │
│ TLS Handshake                │
│ Certificate Verification     │
│ Encryption Established       │
└──────────────┬───────────────┘
               │
               │ Secure HTTP Request
               ▼
┌──────────────────────────────┐
│       11. WEB SERVER         │
│                              │
│       Amazon S3              │
│                              │
│ Static Website Bucket        │
│                              │
│ ├── index.html               │
│ ├── style.css                │
│ ├── script.js                │
│ └── assets/                  │
└──────────────┬───────────────┘
               │
               │ HTTP Response
               ▼
┌──────────────────────────────┐
│       12. WEB BROWSER        │
│                              │
│ Receives index.html          │
│                              │
│ Downloads CSS                │
│ Downloads JavaScript         │
│ Downloads Images             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      13. BROWSER ENGINE      │
│                              │
│ HTML → DOM                   │
│ CSS → Styling/Layout         │
│ JS → Functionality           │
│ assets → Resources           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       14. FINAL WEBSITE      │
│                              │
│       🖥️ Web Page            │
│                              │
│       Displayed to User      │
└──────────────────────────────┘