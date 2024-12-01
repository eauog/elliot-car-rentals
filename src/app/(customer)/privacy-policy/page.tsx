"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <section className="container mx-auto py-12">
          <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">Privacy Policy</h1>

          <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <p className="text-gray-600 mb-8">
              Last updated: October 2024
            </p>

            <p className="text-gray-600 mb-6">
              At Elliot Car Rentals, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, share, and protect your personal data when you use our services, including our website, mobile applications, and any other services.
            </p>

            <p className="text-gray-600 mb-6">
              By using our services, you agree to the terms outlined in this policy.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              We collect personal information from you when you interact with our services. The types of information we may collect include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-600">Personal Information: Such as your name, email address, phone number, and contact details when you sign up for an account or submit a query through our website or app.</li>
              <li className="text-gray-600">Payment Information: When you use the MoMo services, we may collect financial information, including bank account numbers, mobile wallet details, and transaction data.</li>
              <li className="text-gray-600">Usage Data: This includes information about how you use our services, such as your IP address, device type, browser type, and other technical information that helps us improve your experience.</li>
            </ul>

            {/* How We Use Your Information */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to provide, improve, and personalize our services. This includes:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-600">Account Creation and Management: To create and manage your account, process transactions, and ensure secure access to our services.</li>
              <li className="text-gray-600">Service Improvement: To understand how users interact with our services, troubleshoot issues, and make enhancements based on user feedback.</li>
              <li className="text-gray-600">Marketing Communications: With your consent, we may send you promotional materials about our services and new features that may interest you. You can opt out at any time.</li>
            </ul>

            {/* How We Share Your Information */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. How We Share Your Information</h2>
            <p className="text-gray-600 mb-6">
              We do not sell your personal information to third parties. However, we may share your data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-600">Service Providers: We may share your information with trusted third-party vendors who help us operate our services, such as payment processors, cloud storage providers, or customer support platforms.</li>
              <li className="text-gray-600">Legal Obligations: If required by law, or to protect our rights, we may disclose your information to government authorities or other organizations.</li>
            </ul>

            {/* Data Security */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-6">
              We take your data security seriously. We implement reasonable and appropriate measures to protect your personal data from unauthorized access, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-600">Encryption: Sensitive information, such as financial data, is encrypted in transit and at rest.</li>
              <li className="text-gray-600">Access Controls: Only authorized personnel have access to your personal data.</li>
              <li className="text-gray-600">Regular Audits: We conduct regular security audits to identify and address potential vulnerabilities.</li>
            </ul>

            {/* Your Rights */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-6">
              You have certain rights regarding your personal data. These include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-600">Access: You can request access to the personal data we hold about you.</li>
              <li className="text-gray-600">Correction: If you believe any information we have about you is incorrect or incomplete, you can request corrections.</li>
              <li className="text-gray-600">Deletion: You have the right to request the deletion of your personal data under certain circumstances.</li>
              <li className="text-gray-600">Opt-out: You may opt out of receiving marketing communications at any time by following the unsubscribe instructions in the communication or by contacting us directly.</li>
            </ul>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website and mobile app. These cookies help us understand how you use our services, track your preferences, and provide you with personalized content.
            </p>
            <p className="text-gray-600 mb-6">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our services.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-600 mb-6">
              Our services are operated in [Your Country], but your data may be transferred and processed in other countries. We ensure that such transfers comply with applicable data protection laws.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">8. Children’s Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our services are not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children without parental consent. If we become aware that we have inadvertently collected information from a child, we will take steps to delete it as soon as possible.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
            </p>
            <p className="text-gray-600 mb-6">
              Elliot Car Rentals <br />
              23 Artega Street Agape Ablekuma, Accra, Ghana <br />
              Email: aweelliot1@gmail.com <br />
              Phone: +233 55 169 4847
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
