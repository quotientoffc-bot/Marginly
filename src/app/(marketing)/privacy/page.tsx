import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-p:text-white/70 prose-a:text-purple-400">
        <h1 className="text-4xl font-medium mb-8">Marginly Privacy Policy</h1>
        <p className="text-sm font-semibold tracking-wider text-white/40 uppercase mb-12">Effective Date: August 29, 2026</p>
        
        <p>
          Marginly Inc. ("Marginly," "we," "us," or "our") respects your privacy and is strongly committed to keeping secure any information we obtain from you or about you. This Privacy Policy describes our practices with respect to personal information we collect from or about you when you access Marginly and its associated services (collectively, the "Services").
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">1. Personal Information We Collect</h2>
        <p>We collect information that alone or in combination with other information in our possession could be used to identify you ("Personal Information") as follows:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Account Data:</strong> When you register for a Marginly account, we collect your full name, email address, company name, and authentication credentials (such as Google OAuth tokens).</li>
          <li><strong>Financial Data:</strong> When you process payments or manage quotes via the Services, our third-party payment processors (e.g., Stripe) collect your billing information. Marginly does not directly store full credit card numbers.</li>
          <li><strong>Client Data:</strong> Information you input about your clients (names, emails, project details) is securely stored to provide the scope management services. You represent that you have the authority to provide this data to us.</li>
          <li><strong>Automated Usage Data:</strong> We automatically collect diagnostic data, log files, IP addresses, browser types, and timestamp metrics when you interact with the Services.</li>
        </ul>

        <h2 className="text-2xl font-medium mt-12 mb-4">2. How We Use Your Information</h2>
        <p>We use your Personal Information for the following core operational purposes:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>To provide, administer, and maintain the Marginly platform and its core functionalities.</li>
          <li>To securely process OAuth logins via Google and maintain session integrity via Supabase.</li>
          <li>To generate AI-driven project insights using your supplied AI API keys (via the "Bring Your Own Key" architecture). Your keys are encrypted at rest and never shared with unauthorized third parties.</li>
          <li>To detect, investigate, and prevent fraudulent transactions, unauthorized access, and other illegal activities.</li>
          <li>To comply with our legal and regulatory obligations.</li>
        </ul>

        <h2 className="text-2xl font-medium mt-12 mb-4">3. Data Security and Infrastructure</h2>
        <p>
          Marginly implements commercially reasonable, enterprise-grade technical, administrative, and organizational measures designed to protect your Personal Information. 
        </p>
        <p>
          Our database infrastructure is powered by Supabase and PostgreSQL. All data is encrypted at rest using AES-256 encryption, and all data in transit is encrypted using TLS 1.3. We utilize strict Row Level Security (RLS) policies to ensure that your workspace data is cryptographically isolated from all other users on the platform. Despite these measures, no internet transmission is ever completely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">4. Third-Party Integrations and AI Subprocessors</h2>
        <p>
          Marginly connects with third-party APIs (e.g., Google Calendar, OpenAI, Anthropic) to provide enhanced functionality. 
        </p>
        <p>
          <strong>Artificial Intelligence Data Usage:</strong> When you utilize the "Connect AI" functionality using your own API keys, Marginly transmits the specific text you wish to analyze to the respective AI provider (e.g., OpenAI). By using these integrations, you agree to the respective privacy policies of those providers. Marginly strictly configures these API requests to opt-out of data training where supported by the provider, ensuring your project data is not used to train public foundational models.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">5. Your Data Rights (GDPR & CCPA compliance)</h2>
        <p>Depending on your jurisdiction, including the European Economic Area (EEA) and California, you may possess the following statutory rights:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Right to Access:</strong> You may request a comprehensive export of all Personal Information Marginly holds about you.</li>
          <li><strong>Right to Rectification:</strong> You may correct inaccurate or incomplete data directly through the Marginly Dashboard settings.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may permanently delete your account and all associated workspace data at any time via the "Danger Zone" in your Settings panel. This action executes a hard deletion in our primary databases.</li>
          <li><strong>Right to Opt-Out of Sale:</strong> Marginly does not, and will never, sell your Personal Information to third parties.</li>
        </ul>

        <h2 className="text-2xl font-medium mt-12 mb-4">6. Data Retention</h2>
        <p>
          We retain your Personal Information for only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Upon account deletion, your data is immediately purged from our active databases, though encrypted residual copies may temporarily persist in automated disaster recovery backups for up to 30 days before being permanently destroyed.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">7. Contact Information</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or your Personal Information, please contact our Data Protection Officer at:
          <br /><br />
          <strong>Marginly Legal Department</strong><br />
          Email: legal@marginly.com
        </p>
      </div>
    </div>
  );
}
