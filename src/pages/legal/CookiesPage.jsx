import React from "react";

function CookiesPage() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Cookie Policy</h2>
      <p>
        This Cookie Policy explains how Qatip App uses cookies and similar
        technologies to recognize you when you visit our website or use our
        services. It explains what these technologies are and why we use them,
        as well as your rights to control our use of them.
      </p>

      <h3 className="text-xl font-semibold">1. What are Cookies?</h3>
      <p>
        Cookies are small data files that are placed on your computer or mobile
        device when you visit a website. Cookies are widely used by website
        owners to make their websites work, or to work more efficiently, as well
        as to provide reporting information.
      </p>

      <h3 className="text-xl font-semibold">2. Why We Use Cookies</h3>
      <p>We use cookies for several purposes, including to:</p>
      <ul className="list-disc list-inside pl-4">
        <li>Recognize you when you return to our platform</li>
        <li>Understand how you use our services to improve user experience</li>
        <li>Enable certain features and functionalities</li>
        <li>Provide analytics and performance insights</li>
        <li>Deliver targeted advertisements and marketing</li>
        <li>Ensure site security and prevent fraud</li>
      </ul>

      <h3 className="text-xl font-semibold">3. Types of Cookies We Use</h3>
      <ul className="list-disc list-inside pl-4">
        <li><strong>Essential Cookies:</strong> Required for the operation of our platform.</li>
        <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the site.</li>
        <li><strong>Functionality Cookies:</strong> Enable personalization features like remembering preferences.</li>
        <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads and track ad effectiveness.</li>
      </ul>

      <h3 className="text-xl font-semibold">4. Your Consent</h3>
      <p>
        By continuing to use our site, you consent to the use of cookies in
        accordance with this Cookie Policy. You may see a banner or pop-up when
        you first visit, requesting your consent.
      </p>

      <h3 className="text-xl font-semibold">5. Managing Cookies</h3>
      <p>
        You can manage or disable cookies through your browser settings. Please
        note that disabling cookies may affect your ability to use certain
        features of Qatip App.
      </p>

      <h3 className="text-xl font-semibold">6. Third-Party Cookies</h3>
      <p>
        Some cookies may be placed by third parties such as analytics providers
        (e.g., Google Analytics) or advertising partners. These third parties
        may use cookies in accordance with their own privacy policies.
      </p>

      <h3 className="text-xl font-semibold">7. Changes to This Policy</h3>
      <p>
        We may update this Cookie Policy from time to time. We recommend you
        revisit this page periodically to stay informed.
      </p>

      <h3 className="text-xl font-semibold">8. Contact Us</h3>
      <p>
        If you have any questions about our use of cookies or this policy,
        please contact us at: <br />
        <a href="mailto:support@qatip.app" className="text-blue-600">support@qatip.app</a>
      </p>
    </div>
  );
}

export default CookiesPage;
