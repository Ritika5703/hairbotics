// TermsOfService.tsx
import React from "react";

interface TermsSection {
  id: string;
  title: string;
  content: string;
}

interface TermsOfServiceData {
  lastUpdated: string;
  sections: TermsSection[];
}

const TermsOfService: React.FC = () => {
  const termsData: TermsOfServiceData = {
    lastUpdated: "April 23, 2025",
    sections: [
      {
        id: "1",
        title: "1. Acceptance of Terms",
        content:
          'By accessing or using Hairbotics services, website, or mobile application (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Services.',
      },
      {
        id: "2",
        title: "2. Description of Services",
        content:
          "Hairbotics provides AI-powered hair care recommendations, virtual hair consultations, personalized product recommendations, and related services. We may update, modify, or enhance our Services at any time without prior notice.",
      },
      {
        id: "3",
        title: "3. User Accounts",
        content:
          "To access certain features of the Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
      },
      {
        id: "4",
        title: "4. User Content",
        content:
          "By submitting content (including photos, reviews, or comments) to our Services, you grant Hairbotics a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, publish, and distribute such content for the purposes of providing and improving our Services.",
      },
      {
        id: "5",
        title: "5. Privacy",
        content:
          "Your use of our Services is also governed by our Privacy Policy, which can be found on our website. By using the Services, you consent to the collection and use of information as detailed in our Privacy Policy.",
      },
      {
        id: "6",
        title: "6. Intellectual Property",
        content:
          "The Services and all content, features, and functionality thereof, including but not limited to text, graphics, logos, icons, and software, are owned by Hairbotics or its licensors and are protected by copyright, trademark, and other intellectual property laws.",
      },
      {
        id: "7",
        title: "7. Limitation of Liability",
        content:
          "To the maximum extent permitted by law, Hairbotics shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.",
      },
      {
        id: "8",
        title: "8. Disclaimers",
        content:
          'The Services are provided "as is" and "as available" without any warranties of any kind, either express or implied. Hairbotics does not warrant that the Services will be uninterrupted or error-free, or that defects will be corrected.',
      },
      {
        id: "9",
        title: "9. Governing Law",
        content:
          "These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.",
      },
      {
        id: "10",
        title: "10. Changes to Terms",
        content:
          "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
      },
      {
        id: "11",
        title: "11. Contact Us",
        content:
          "If you have any questions about these Terms, please contact us at legal@hairbotics.com or through our Contact Us page.",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-100">
        {/* Header with green background */}
        <div className="px-6 py-8 bg-green-600 text-white">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-green-100">
            Last updated: {termsData.lastUpdated}
          </p>
        </div>

        {/* Terms content */}
        <div className="px-6 py-8">
          {termsData.sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600">{section.content}</p>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t border-green-100">
            <div className="bg-gradient-from-green-50 to-green-100 p-6 rounded-lg">
              <p className="text-gray-600 italic">
                By using Hairbotics services, you acknowledge that you have read
                and understand these Terms of Service and agree to be bound by
                them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
