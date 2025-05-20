# 🔐 Security Policy

## 📌 Overview

This document outlines the security policy for **Toolbox Suite**, a multi-functional web app that includes 20+ tools, a user forum, and a SaaS-based rewards platform. The goal of this policy is to protect user data, ensure secure tool operation, and maintain platform integrity while complying with modern standards.

---

## 🧑‍💻 User Authentication & Authorization

- **Authentication**
  - Firebase Authentication with email/password and OAuth (Google, GitHub).
  - Passwords must meet minimum complexity standards.
  - Firebase multi-factor authentication required for admin users.

- **Session Management**
  - Secure, HTTP-only session cookies.
  - Short-lived access tokens with auto-refresh.
  - Re-authentication required for sensitive operations.

- **Access Control**
  - Role-Based Access Control (RBAC) model:
    - `admin`, `moderator`, `user`, `guest`.
  - Firestore security rules enforce role-specific access.
  - Users can only access or modify their own data.

---

## 🔐 Data Security

- **Encryption**
  - TLS 1.2+ enforced for all data in transit.
  - Firestore and Firebase Storage encrypted at rest.

- **Sensitive Data Handling**
  - Passwords and sensitive fields never stored in plaintext.
  - API keys and secrets are stored securely in environment variables (`.env`).
  - No secrets are exposed to the frontend or client builds.

---

## 🔥 Firestore Database & Security Rules

- **Granular Access Control**
  ```js
  match /users/{userId} {
    allow read, write: if request.auth.uid == userId;
  }
