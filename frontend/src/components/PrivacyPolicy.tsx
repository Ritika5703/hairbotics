import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            <span className="text-green-600">Hairbotics</span> Privacy Policy
          </h1>

          <div className="w-20 h-1 bg-green-500 mx-auto mb-12"></div>

          <div className="text-sm text-gray-500 mb-8 text-center">
            Effective Date: April 21, 2025
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-6">
              <p className="text-gray-600 mb-4">
                Welcome to Hairbotics ("we," "our," or "us"). We understand that
                your privacy is important, and we are committed to protecting
                the personal information you share with us through our
                AI-powered hair analysis service. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information
                when you use our website, mobile application, and related
                services (collectively, the "Service").
              </p>
              <p className="text-gray-600">
                Please read this Privacy Policy carefully. By accessing or using
                our Service, you acknowledge that you have read, understood, and
                agree to be bound by the terms of this Privacy Policy.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-medium text-green-600 mb-3">
              Information You Provide to Us
            </h3>
            <p className="text-gray-600 mb-4">
              We may collect the following types of information when you use our
              Service:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Account Information:</span> When
                you create an account, we collect your name, email address, and
                password.
              </li>
              <li>
                <span className="font-medium">Profile Information:</span>{" "}
                Information you provide in your user profile, such as age,
                gender, location, and hair concerns.
              </li>
              <li>
                <span className="font-medium">Hair Images:</span> Photographs of
                your hair that you upload for AI analysis.
              </li>
              <li>
                <span className="font-medium">Survey Responses:</span>{" "}
                Information about your hair care routine, products you use, and
                hair concerns.
              </li>
              <li>
                <span className="font-medium">Communications:</span> Information
                you provide when you contact our customer support team.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-green-600 mb-3">
              Information Automatically Collected
            </h3>
            <p className="text-gray-600 mb-4">
              When you use our Service, we may automatically collect certain
              information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Device Information:</span>{" "}
                Information about the device you use to access our Service,
                including device type, operating system, and unique device
                identifiers.
              </li>
              <li>
                <span className="font-medium">Usage Information:</span>{" "}
                Information about how you use our Service, including the
                features you access, time spent on the Service, and interaction
                with content.
              </li>
              <li>
                <span className="font-medium">Log Data:</span> Our servers
                automatically record information when you use our Service,
                including your IP address, browser type, and referring/exit
                pages.
              </li>
              <li>
                <span className="font-medium">
                  Cookies and Similar Technologies:
                </span>{" "}
                We use cookies and similar tracking technologies to collect
                information about your browsing activities and to manage your
                preferences.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We may use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">
                  Provide and Improve our Service:
                </span>{" "}
                To operate, maintain, enhance, and provide features of our
                Service, including the AI hair analysis.
              </li>
              <li>
                <span className="font-medium">Personalization:</span> To
                personalize your experience and provide tailored recommendations
                for your hair care routine.
              </li>
              <li>
                <span className="font-medium">Communication:</span> To respond
                to your inquiries, send you notifications about your account,
                and provide you with service-related announcements.
              </li>
              <li>
                <span className="font-medium">Analytics:</span> To analyze
                trends, usage, and activities in connection with our Service and
                for marketing or advertising purposes.
              </li>
              <li>
                <span className="font-medium">Research and Development:</span>{" "}
                To improve our algorithms and develop new features, products,
                and services.
              </li>
              <li>
                <span className="font-medium">Legal Obligations:</span> To
                comply with legal obligations, resolve disputes, and enforce our
                Terms of Service.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How We Share Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Service Providers:</span> With
                third-party vendors, consultants, and other service providers
                who need access to your information to perform services on our
                behalf.
              </li>
              <li>
                <span className="font-medium">Business Transfers:</span> If we
                are involved in a merger, acquisition, financing, or sale of all
                or a portion of our assets, your information may be transferred
                as part of that transaction.
              </li>
              <li>
                <span className="font-medium">Legal Requirements:</span> If
                required to do so by law or in the good faith belief that such
                action is necessary to comply with legal obligations, protect
                our rights, or the safety of our users.
              </li>
              <li>
                <span className="font-medium">
                  Aggregated or De-identified Data:
                </span>{" "}
                We may share aggregated or de-identified information that cannot
                reasonably be used to identify you.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Data Security
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures
                to protect the security of your personal information from
                unauthorized access, use, alteration, or disclosure. However,
                please be aware that no method of transmission over the internet
                or electronic storage is 100% secure.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600">
              We will retain your personal information only for as long as
              reasonably necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required by
              law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-gray-700 mb-2">Access</p>
                <p className="text-gray-600 text-sm">
                  The right to request copies of your personal information.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-gray-700 mb-2">Correction</p>
                <p className="text-gray-600 text-sm">
                  The right to request that we correct inaccurate information
                  about you.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-gray-700 mb-2">Deletion</p>
                <p className="text-gray-600 text-sm">
                  The right to request that we delete your personal information
                  in certain circumstances.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-gray-700 mb-2">Restriction</p>
                <p className="text-gray-600 text-sm">
                  The right to request that we restrict the processing of your
                  information in certain circumstances.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-gray-700 mb-2">
                  Data Portability
                </p>
                <p className="text-gray-600 text-sm">
                  The right to receive a copy of your personal information in a
                  structured, commonly used, and machine-readable format.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="font-medium text-gray-700 mb-2">Objection</p>
                <p className="text-gray-600 text-sm">
                  The right to object to our processing of your personal
                  information.
                </p>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600">
              Our Service is not directed to children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If you are a parent or guardian and believe that your child has
              provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. The updated
              version will be indicated by an updated "Effective Date" at the
              top of this Privacy Policy. We encourage you to review this
              Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="bg-green-600 text-white p-8 rounded-xl shadow-lg">
              <p className="mb-6">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Hairbotics, Inc.</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>privacy@hairbotics.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Mumbai, Maharashtra</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>9876543210</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your California Privacy Rights
            </h2>
            <p className="text-gray-600">
              If you are a California resident, you have certain rights under
              the California Consumer Privacy Act (CCPA). For more information
              about these rights and how to exercise them, please refer to our
              California Privacy Notice, which is incorporated into this Privacy
              Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              International Data Transfers
            </h2>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries
              other than the country in which you reside. These countries may
              have data protection laws that are different from the laws of your
              country. We have taken appropriate safeguards to ensure that your
              personal information remains protected in accordance with this
              Privacy Policy.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-16">
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} Hairbotics, Inc. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
