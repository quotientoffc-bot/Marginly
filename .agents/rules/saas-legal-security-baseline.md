---
description: Mandatory legal and security guidelines before releasing or deploying an app to prevent lawsuits and fines.
trigger: always_on
---

# SaaS Legal & Security Baseline

Whenever I am asked to release, publish, or deploy an application, I must strictly enforce the following checklist to protect the business from liability, fines, and data breaches:

## 1. Legal Protection (Avoiding Lawsuits)
*   **Terms of Service (ToS):** Must include an **"As-Is" Warranty Disclaimer** (stating the software is provided without warranties), a strict **Limitation of Liability** clause (capping damages to the amount the user paid), and an **Indemnification** clause.
*   **Privacy Policy:** Must explicitly detail data collection, third-party sub-processors, and contain clauses addressing regional compliance (e.g., GDPR rights for EU users, CCPA rights for California users).
*   **Refund Policy:** Must establish clear, non-ambiguous terms for chargebacks and subscription cancellations.

## 2. Security Protection (Avoiding Hacks & Fines)
*   **Database Isolation:** Row Level Security (RLS) or equivalent database rules must be actively enabled and audited to prevent tenant cross-contamination or unauthorized scraping.
*   **Secret Management:** No API keys, database URIs, or credentials can be exposed in client-side code.
*   **Input Validation:** User-provided inputs must be sanitized to prevent injection attacks.
