import React from "react";

function TermsPage() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Terms of Service</h2>

      <p className="mb-4">
        These Terms of Service ("Terms") govern your access to and use of the Qatip App ("Service"), provided by Qatip Inc. ("we", "us", or "our"). By accessing or using the Service, you agree to be bound by these Terms.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h3>
      <p className="mb-4">
        By creating an account or using the Qatip App, you confirm that you are at least 16 years old and agree to these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to accept these Terms on its behalf.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">2. Account Registration</h3>
      <p className="mb-4">
        You must provide accurate, current, and complete information when registering for an account. You are responsible for maintaining the confidentiality of your account and password and for all activities under your account.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">3. Use of the Service</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Do not misuse our Service or interfere with its normal operation.</li>
        <li>Do not attempt to access it using a method other than the interface we provide.</li>
        <li>You may not use the Service to violate applicable laws or regulations.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">4. Subscription and Payment</h3>
      <p className="mb-4">
        Certain features may require payment. Subscription plans are billed on a recurring basis and may automatically renew unless canceled before the end of the billing period.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h3>
      <p className="mb-4">
        All content, trademarks, and software are owned by Qatip Inc. or its licensors. You may not copy, modify, distribute, or reverse engineer any part of the Service without prior written consent.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">6. Termination</h3>
      <p className="mb-4">
        We may suspend or terminate your access at any time for violations of these Terms. You may also delete your account at any time via the settings page.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">7. Disclaimer and Limitation of Liability</h3>
      <p className="mb-4">
        The Service is provided "as is" without warranty of any kind. To the maximum extent permitted by law, Qatip Inc. shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Service.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">8. Modifications</h3>
      <p className="mb-4">
        We may modify these Terms at any time. If changes are material, we will notify you by email or within the app. Continued use of the Service constitutes acceptance of the new Terms.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">9. Governing Law</h3>
      <p className="mb-4">
        These Terms are governed by the laws of Switzerland, without regard to its conflict of law principles. Any disputes arising out of or related to these Terms will be resolved in the competent courts of Geneva.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">10. Contact</h3>
      <p className="mb-4">
        For any questions regarding these Terms, please contact us at :
        <br /> <a href="mailto:support@qatip.app" className="text-blue-600">support@qatip.app</a>.
      </p>
    </div>
  );
}

export default TermsPage;
