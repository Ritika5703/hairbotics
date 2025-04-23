// ContactUs.tsx
import React, { useState } from "react";

interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

const ContactUs: React.FC = () => {
  const contactInfo: ContactInfo = {
    email: "support@hairbotics.com",
    phone: "+91 9876543210",
    address: {
      street: "BKC",
      city: "Mumbai, Maharashtra",
      zipCode: "401108",
    },
    businessHours: {
      weekdays: "Monday - Friday: 9am - 6pm IST",
      saturday: "Saturday: 10am - 4pm IST",
      sunday: "Sunday: Closed",
    },
  };

  // Simple form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
    // Show success message or redirect
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-100">
        {/* Header with green background */}
        <div className="px-6 py-8 bg-green-600 text-white">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-green-100">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8">
          {/* Contact Information Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Get in Touch
              </h2>
              <p className="text-gray-600">
                We're here to help with any questions about our AI-powered hair
                care solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Email</p>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Phone</p>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Address</p>
                  <p className="text-gray-600">{contactInfo.address.street}</p>
                  <p className="text-gray-600">
                    {contactInfo.address.city} {contactInfo.address.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">
                    Business Hours
                  </p>
                  <p className="text-gray-600">
                    {contactInfo.businessHours.weekdays}
                  </p>
                  <p className="text-gray-600">
                    {contactInfo.businessHours.saturday}
                  </p>
                  <p className="text-gray-600">
                    {contactInfo.businessHours.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form and Map Column */}
          <div>
            {/* Contact Form */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="bg-green-100 rounded-lg overflow-hidden h-64 relative">
              {/* This would be a map in a real application */}
              <div className="absolute inset-0 bg-green-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto bg-green-500 rounded-full p-3 mb-3">
                    <svg
                      className="h-8 w-8 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8.002 8.002 0 0112.827-9.383 7.998 7.998 0 012.236 9.383z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.701767127!2d72.71412823032126!3d19.082482211550346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1745432266703!5m2!1sen!2sin"
                      width="600"
                      height="450"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <p className="text-green-600 font-medium">
                    Hairbotics Headquarters
                  </p>
                  <p className="text-gray-600 text-sm">
                    {contactInfo.address.street}, {contactInfo.address.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
