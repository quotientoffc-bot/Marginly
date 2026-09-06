import React from 'react';

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-p:text-white/70 prose-a:text-purple-400">
        <h1 className="text-4xl font-medium mb-8">Marginly Cookie Policy</h1>
        <p className="text-sm font-semibold tracking-wider text-white/40 uppercase mb-12">Effective Date: August 29, 2026</p>
        
        <p>
          Marginly Inc. ("Marginly," "we," "us," or "our") uses cookies, web beacons, tracking pixels, and other tracking technologies when you visit our website, marginly.net, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site") to help customize the Site and improve your experience.
        </p>

        <p>
          We reserve the right to make changes to this Cookie Policy at any time and for any reason. We will alert you about any changes by updating the "Effective Date" of this Cookie Policy.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">1. Use of Cookies</h2>
        <p>
          A "cookie" is a string of information which assigns you a unique identifier that we store on your computer. Your browser then provides that unique identifier to use each time you submit a query to the Site. We use cookies on the Site to, among other things, keep track of services you have used, record registration information, record your user preferences, keep you logged into the Site, facilitate purchase procedures, and track the pages you visit.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">2. Types of Cookies</h2>
        <p>The following types of cookies may be used when you visit the Site:</p>
        
        <h3 className="text-xl font-medium mt-8 mb-2">Strictly Necessary Cookies</h3>
        <p>
          These cookies are essential for you to browse the Site and use its features, such as accessing secure areas of the Site. Without these cookies, services like secure login (via Supabase) and maintaining your session state cannot be provided. 
        </p>

        <h3 className="text-xl font-medium mt-8 mb-2">Analytics and Performance Cookies</h3>
        <p>
          These cookies collect information about how you use the Site, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole purpose is to improve Site functions.
        </p>

        <h3 className="text-xl font-medium mt-8 mb-2">Security Cookies</h3>
        <p>
          Security cookies help identify and prevent security risks. We use these cookies to authenticate users and protect user data from unauthorized parties.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">3. Control of Cookies</h2>
        <p>
          Most browsers are set to accept cookies by default. However, you can remove or reject cookies in your browser's settings. Please be aware that such action could affect the availability and functionality of the Site (for example, you may not be able to log in to the Marginly Dashboard).
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">4. Other Tracking Technologies</h2>
        <p>
          In addition to cookies, we may use web beacons, pixel tags, and other tracking technologies on the Site to help customize the Site and improve your experience. A "web beacon" or "pixel tag" is a tiny object or image embedded in a web page or email. They are used to track the number of users who have visited particular pages and viewed emails, and acquire other statistical data.
        </p>

        <h2 className="text-2xl font-medium mt-12 mb-4">5. Contact Us</h2>
        <p>
          If you have questions or comments about this Cookie Policy, please contact us at:
          <br /><br />
          <strong>Marginly Legal Department</strong><br />
          Email: legal@marginly.com
        </p>
      </div>
    </div>
  );
}
