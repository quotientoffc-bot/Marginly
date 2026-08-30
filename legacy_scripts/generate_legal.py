import os

os.makedirs("src/app/(marketing)/privacy", exist_ok=True)
os.makedirs("src/app/(marketing)/terms", exist_ok=True)
os.makedirs("src/app/(marketing)/refunds", exist_ok=True)

privacy_content = """import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-medium mb-8">Privacy Policy</h1>
        <p className="text-white/70 mb-4">Last updated: August 2026</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">1. Information We Collect</h2>
        <p className="text-white/70 mb-4">We collect information that you provide directly to us, including your name, email address, and billing information when you register for a Margin account. We also automatically collect certain technical information when you use our services, such as IP addresses, browser types, and usage data.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">2. How We Use Your Information</h2>
        <p className="text-white/70 mb-4">We use the information we collect to provide, maintain, and improve our services, process transactions, send administrative messages, and protect against fraudulent or illegal activity. Margin does not sell your personal data to third parties.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">3. Data Security & Storage</h2>
        <p className="text-white/70 mb-4">We implement enterprise-grade security measures designed to protect your information. Your data is encrypted at rest and in transit. However, no security system is impenetrable, and we cannot guarantee the absolute security of our systems.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">4. Third-Party Integrations</h2>
        <p className="text-white/70 mb-4">Margin integrates with third-party services (such as Google Workspace). When you authorize these connections, we access and store data strictly necessary to facilitate the service. We adhere to the API terms of all integrated platforms.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">5. Contact Us</h2>
        <p className="text-white/70 mb-4">If you have any questions about this Privacy Policy, please contact our legal team at hello@margin.com.</p>
      </div>
    </div>
  );
}
"""

terms_content = """import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-medium mb-8">Terms of Service</h1>
        <p className="text-white/70 mb-4">Last updated: August 2026</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">1. Acceptance of Terms</h2>
        <p className="text-white/70 mb-4">By accessing and using Margin ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">2. Description of Service</h2>
        <p className="text-white/70 mb-4">Margin provides AI-powered quoting and scope management tools. We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">3. User Responsibilities</h2>
        <p className="text-white/70 mb-4">You are responsible for maintaining the confidentiality of your account credentials. You agree not to misuse the Service, including attempting to bypass security measures, reverse-engineering our software, or uploading malicious code.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">4. Intellectual Property</h2>
        <p className="text-white/70 mb-4">All content, features, and functionality of the Service are owned by Margin Inc. You retain ownership of the data and content you upload to the Service.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">5. Limitation of Liability</h2>
        <p className="text-white/70 mb-4">Margin shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service, including lost profits or data loss.</p>
      </div>
    </div>
  );
}
"""

refunds_content = """import React from 'react';

export default function Refunds() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-medium mb-8">Sales and Refunds Policy</h1>
        <p className="text-white/70 mb-4">Last updated: August 2026</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">1. Subscription Billing</h2>
        <p className="text-white/70 mb-4">Margin operates on a subscription basis. You will be billed in advance on a recurring schedule. All charges are non-refundable unless legally mandated by your local jurisdiction.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">2. Cancellation</h2>
        <p className="text-white/70 mb-4">You may cancel your subscription at any time through your billing dashboard. Cancellation will take effect at the end of the current billing cycle, and you will retain access to the Service until that date.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">3. Refund Exceptions</h2>
        <p className="text-white/70 mb-4">We generally do not offer refunds for partial months of service or for periods where you maintained an active account but did not use the Service. Exceptions may be made in cases of prolonged service outages or accidental duplicate charges, at our sole discretion.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">4. Dispute Resolution</h2>
        <p className="text-white/70 mb-4">Before initiating a chargeback with your financial institution, we ask that you contact our support team at hello@margin.com to resolve any billing issues amicably.</p>
      </div>
    </div>
  );
}
"""

with open("src/app/(marketing)/privacy/page.tsx", "w") as f:
    f.write(privacy_content)

with open("src/app/(marketing)/terms/page.tsx", "w") as f:
    f.write(terms_content)

with open("src/app/(marketing)/refunds/page.tsx", "w") as f:
    f.write(refunds_content)

print("Generated legal pages")
