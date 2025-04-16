import React from "react";

function PrivacyPage() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Privacy Policy</h2>
      <p>
        At Qatip App, we are committed to protecting your personal data and
        respecting your privacy. This Privacy Policy describes how we collect,
        use, and protect the information you provide to us.
      </p>

      <h3 className="text-xl font-semibold">1. Information We Collect</h3>
      <p>
        We collect various types of personal and usage information to enhance
        your experience and operate our services effectively.
      </p>
      <ul className="list-disc list-inside pl-4">
        <li><strong>Personal Information:</strong> Your name, email address, profile picture, and login credentials.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with Qatip App, including feature usage, IP address, browser type, device information, and location (if enabled).</li>
        <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to remember preferences and analyze app performance.</li>
      </ul>

      <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
      <ul className="list-disc list-inside pl-4">
        <li>To provide and personalize the services you request</li>
        <li>To improve our application, troubleshoot problems, and analyze trends</li>
        <li>To send you service-related communications, such as updates or technical notices</li>
        <li>To detect and prevent fraud, abuse, or violations of our terms</li>
      </ul>

      <h3 className="text-xl font-semibold">3. Data Sharing and Disclosure</h3>
      <p>
        We do not sell your personal data. However, we may share your information with:
      </p>
      <ul className="list-disc list-inside pl-4">
        <li><strong>Service Providers:</strong> Third parties who perform services on our behalf (e.g., hosting, analytics, customer support).</li>
        <li><strong>Legal Obligations:</strong> If required by law, or to protect our rights and users' safety.</li>
        <li><strong>Business Transfers:</strong> In case of a merger, acquisition, or asset sale, your data may be transferred as part of the transaction.</li>
      </ul>

      <h3 className="text-xl font-semibold">4. Your Rights and Choices</h3>
      <ul className="list-disc list-inside pl-4">
        <li>You can access, correct, or delete your personal information by contacting us.</li>
        <li>You may opt out of marketing communications at any time.</li>
        <li>You can control cookies through your browser settings.</li>
      </ul>

      <h3 className="text-xl font-semibold">5. Data Retention</h3>
      <p>
        We retain your information for as long as necessary to provide services, comply with legal obligations, and resolve disputes.
      </p>

      <h3 className="text-xl font-semibold">6. Security Measures</h3>
      <p>
        We implement technical and organizational measures to protect your data against unauthorized access, alteration, or loss.
      </p>

      <h3 className="text-xl font-semibold">7. Children's Privacy</h3>
      <p>
        Qatip App is not intended for children under 13. We do not knowingly collect personal information from children.
      </p>

      <h3 className="text-xl font-semibold">8. International Users</h3>
      <p>
        If you access Qatip App from outside Switzerland, you consent to the processing of your information in Switzerland and other countries.
      </p>

      <h3 className="text-xl font-semibold">9. Updates to This Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant changes and post the latest version on this page.
      </p>

      <h3 className="text-xl font-semibold">10. Contact Us</h3>
      <p>
        If you have questions or concerns about this policy, please contact us at: <br />
        <a href="mailto:support@qatip.app" className="text-blue-600">support@qatip.app</a>
      </p>
    </div>
  );
}

export default PrivacyPage;
