import React from 'react';

export default function Refunds() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-medium mb-8">Sales and Refunds Policy</h1>
        <p className="text-white/70 mb-4">Last updated: August 2026</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">1. Subscription Billing</h2>
        <p className="text-white/70 mb-4">Marginly operates on a subscription basis. You will be billed in advance on a recurring schedule. All charges are non-refundable unless legally mandated by your local jurisdiction.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">2. Cancellation</h2>
        <p className="text-white/70 mb-4">You may cancel your subscription at any time through your billing dashboard. Cancellation will take effect at the end of the current billing cycle, and you will retain access to the Service until that date.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">3. Refund Exceptions</h2>
        <p className="text-white/70 mb-4">We generally do not offer refunds for partial months of service or for periods where you maintained an active account but did not use the Service. Exceptions may be made in cases of prolonged service outages or accidental duplicate charges, at our sole discretion.</p>
        
        <h2 className="text-2xl font-medium mt-12 mb-4">4. Dispute Resolution</h2>
        <p className="text-white/70 mb-4">Before initiating a chargeback with your financial institution, we ask that you contact our support team at hello@marginly.com to resolve any billing issues amicably.</p>
      </div>
    </div>
  );
}
