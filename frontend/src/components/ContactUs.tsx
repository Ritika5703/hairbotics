import React, { useEffect, useState, useRef } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  Send,
  AlertCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
};

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  availability: string;
  email: string;
  bio: string;
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const ContactUs: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string>("");
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<
    { text: string; isBot: boolean }[]
  >([
    {
      text: "Hello! I'm HairBot, your virtual assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation effect for elements
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-in");
      }, 100 * index);
    });

    // Clear copied field indicator after 2 seconds
    if (copiedField) {
      const timer = setTimeout(() => setCopiedField(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedField]);

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const contactInfo: ContactInfo = {
    address: "123 Innovation Park, Mumbai, Maharashtra",
    phone: "+91 9876543210",
    email: "contact@hairbotics.com",
    hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
    mapUrl: "https://goo.gl/maps/XYzAbCdEfGhIjKlM1",
  };

  const copyToClipboard = (text: string, field: string): void => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
  };

  const teamMembers: TeamMember[] = [
    {
      name: "Aanya Sharma",
      role: "Customer Support Lead",
      avatar: "/api/placeholder/80/80",
      availability: "Available 9am-5pm IST",
      email: "aanya.sharma@hairbotics.com",
      bio: "Aanya has 5+ years of experience in customer service and specializes in helping clients find the perfect hair care solutions.",
    },
    {
      name: "Raj Patel",
      role: "Technical Support",
      avatar: "/api/placeholder/80/80",
      availability: "Available 10am-6pm IST",
      email: "raj.patel@hairbotics.com",
      bio: "Raj handles all technical inquiries related to our AI hair analyzer app and smart devices.",
    },
    {
      name: "Priya Singh",
      role: "Partnership Manager",
      avatar: "/api/placeholder/80/80",
      availability: "Available 9am-5pm IST",
      email: "priya.singh@hairbotics.com",
      bio: "Priya works with salons, stylists, and retailers interested in partnering with Hairbotics.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formState.message.trim()) {
      errors.message = "Please enter your message";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after successful submission
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 1500);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages((prev) => [...prev, { text: chatInput, isBot: false }]);

    // Simulate bot response
    setTimeout(() => {
      let response: string;
      const input = chatInput.toLowerCase();

      if (input.includes("product") || input.includes("recommend")) {
        response =
          "I'd be happy to recommend products for your hair type! Could you tell me if your hair is dry, oily, or normal, and if you have any specific concerns?";
      } else if (input.includes("analyzer") || input.includes("app")) {
        response =
          "Our AI hair analyzer app works by analyzing photos of your hair to determine its condition and needs. You can download it from the App Store or Google Play store!";
      } else if (input.includes("subscription") || input.includes("price")) {
        response =
          "Our subscription plans start at ₹999/month and include personalized product recommendations, virtual consultations, and exclusive discounts!";
      } else if (input.includes("routine") || input.includes("care")) {
        response =
          "A good hair care routine typically includes washing with the right shampoo 2-3 times a week, conditioning, occasional deep treatments, and protection from heat and sun.";
      } else {
        response =
          "Thanks for your message! For more detailed information, our team will be happy to help during business hours. Would you like me to have someone contact you?";
      }

      setChatMessages((prev) => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setChatInput("");
  };

  interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    action?: string;
    copyValue?: string;
    field?: string;
    url?: string;
  }

  const ContactItem: React.FC<ContactItemProps> = ({
    icon,
    title,
    value,
    action,
    copyValue,
    field,
    url,
  }) => (
    <div className="flex items-start gap-4 group hover:bg-green-50 transition-all p-3 rounded-xl">
      <div className="bg-gradient-to-tr from-green-500 to-green-600 text-white p-3 rounded-xl shadow-md">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-green-600">{title}</p>
        <p className="text-gray-700">{value}</p>

        {action === "Map" && url && (
          <Link
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 text-xs text-green-600 hover:text-green-800 font-medium"
          >
            <ExternalLink size={14} className="mr-1" /> View on Map
          </Link>
        )}

        {copyValue && field && (
          <button
            onClick={() => copyToClipboard(copyValue, field)}
            className="inline-flex items-center mt-2 text-xs text-green-600 hover:text-green-800 font-medium"
          >
            {copiedField === field ? (
              <>
                <Check size={14} className="mr-1" /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter size={18} className="text-green-600" />;
      case "instagram":
        return <Instagram size={18} className="text-green-600" />;
      case "facebook":
        return <Facebook size={18} className="text-green-600" />;
      case "youtube":
        return <Youtube size={18} className="text-green-600" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-green-100"></div>;
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-green-50 to-white py-16 sm:py-24 px-6 sm:px-12 lg:px-24 text-gray-800 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-16 -left-10 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply blur-2xl opacity-30" />
        <div className="absolute -bottom-20 -right-16 w-56 h-56 bg-green-100 rounded-full mix-blend-multiply blur-2xl opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-green-200 rounded-full mix-blend-multiply blur-xl opacity-20" />
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-green-300 rounded-full mix-blend-multiply blur-xl opacity-10" />
        <svg
          className="absolute -bottom-24 -left-24 text-green-50 w-96 h-96"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.6C64.8,56,53.7,68.3,40.2,76.3C26.7,84.3,10.8,88,-4.4,87.3C-19.5,86.6,-39.1,81.5,-53.6,71.9C-68.1,62.3,-77.5,48.2,-83.2,32.6C-88.9,17,-90.9,0,-86.5,-15C-82.2,-30,-71.5,-42.9,-58.9,-51.1C-46.3,-59.3,-31.8,-62.7,-18.5,-63.6C-5.2,-64.5,8,-62.9,20.8,-65.5C33.7,-68.1,46.1,-74.9,58.6,-74.1C71,-73.3,83.5,-64.8,90.8,-52.7C98.1,-40.7,100.3,-25,98.5,-9.8C96.7,5.3,91,20,80.8,28.8C70.6,37.6,56,40.5,42.6,44.9C29.3,49.3,17.2,55.1,4.2,57.8C-8.9,60.5,-22.8,60,-32.7,54.5C-42.5,49,-48.4,38.4,-54.5,28C-60.6,17.7,-67.1,7.5,-68.4,-3.3C-69.7,-14.1,-65.9,-25.6,-60.8,-37.8C-55.7,-50,-49.2,-62.8,-39,-70.8C-28.9,-78.7,-14.4,-81.7,0.2,-82.1C14.9,-82.4,29.8,-80,42.2,-75.4C54.6,-70.7,64.5,-63.9,73.9,-54.6C83.3,-45.4,92.2,-33.7,96.5,-20.4C100.9,-7,100.7,7.9,93.7,19.2"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Page Content - z-10 to stay above decorative elements */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-16 text-center" data-animate>
          <div className="inline-block bg-green-100 px-3 py-1 rounded-full text-green-700 font-medium text-sm mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent">
            Contact Hairbotics
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Have questions about our AI-powered hair care solutions? Our team is
            here to help you transform your hair care routine.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Info Card */}
          <div className="lg:col-span-1" data-animate>
            <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <p className="text-green-100 mt-1">
                  Reach out through any of these channels
                </p>
              </div>

              <div className="p-6 space-y-6">
                <ContactItem
                  icon={<MapPin size={20} />}
                  title="Our Address"
                  value={contactInfo.address}
                  action="Map"
                  url={contactInfo.mapUrl}
                />
                <ContactItem
                  icon={<Phone size={20} />}
                  title="Phone Number"
                  value={contactInfo.phone}
                  copyValue={contactInfo.phone}
                  field="phone"
                />
                <ContactItem
                  icon={<Mail size={20} />}
                  title="Email Address"
                  value={contactInfo.email}
                  copyValue={contactInfo.email}
                  field="email"
                />
                <ContactItem
                  icon={<Clock size={20} />}
                  title="Business Hours"
                  value={contactInfo.hours}
                />
              </div>

              <div className="p-6 bg-green-50/50 border-t border-green-100">
                <h4 className="font-medium text-green-700 mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {["twitter", "instagram", "facebook", "youtube"].map(
                    (social) => (
                      <Link
                        key={social}
                        to={`https://${social}.com`}
                        className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
                        aria-label={`Visit our ${social} page`}
                      >
                        <div className="w-6 h-6 flex items-center justify-center text-green-600">
                          {renderSocialIcon(social)}
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Chat */}
            <div
              className="mt-8 bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
              data-animate
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">AI Assistant</h3>
                  <p className="text-green-100 text-xs">Available 24/7</p>
                </div>
                <button
                  onClick={() => setActiveChat(!activeChat)}
                  className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-50 transition-colors"
                >
                  {activeChat ? "Close Chat" : "Start Chat"}
                </button>
              </div>

              {activeChat && (
                <div className="p-4">
                  <div className="bg-gray-50 rounded-xl p-3 h-64 overflow-y-auto mb-3">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-2 flex ${
                          msg.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`rounded-lg px-3 py-2 max-w-4/5 ${
                            msg.isBot
                              ? "bg-white border border-green-100 text-gray-700"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              )}

              {!activeChat && (
                <div className="p-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">
                      Common questions our AI assistant can help with:
                    </p>
                    <ul className="text-xs text-gray-700 mt-2 space-y-1">
                      <li>• Product recommendations for your hair type</li>
                      <li>• How to use our AI hair analyzer</li>
                      <li>• Subscription information and benefits</li>
                      <li>• Common hair care routines</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form and Team Grid */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div
              className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
              data-animate
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                <h3 className="text-xl font-semibold">Send Us a Message</h3>
                <p className="text-green-100 mt-1">
                  We'll get back to you within 24 hours
                </p>
              </div>

              <div className="p-6">
                {submitStatus === "success" ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-green-700 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-600">
                      Thank you for reaching out. We will get back to you as
                      soon as possible.
                    </p>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.name
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                          placeholder="John Doe"
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-xs text-red-500 flex items-center">
                            <AlertCircle size={12} className="mr-1" />{" "}
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.email
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                          placeholder="your@email.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-xs text-red-500 flex items-center">
                            <AlertCircle size={12} className="mr-1" />{" "}
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="technical-support">
                          Technical Support
                        </option>
                        <option value="partnership">
                          Partnership Opportunities
                        </option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-2 border ${
                          formErrors.message
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="How can we help you?"
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />{" "}
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="consent"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="consent"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I agree to receive emails from Hairbotics
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Meet Our Team */}
            <div
              className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
              data-animate
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                <h3 className="text-xl font-semibold">Meet Our Team</h3>
                <p className="text-green-100 mt-1">
                  The people behind Hairbotics are ready to assist you
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.name}
                      className="bg-green-50/50 rounded-2xl p-6 text-center hover:shadow-md transition-all border border-green-100 group"
                      data-animate
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-4 group-hover:shadow-lg transition-all">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-green-700">
                        {member.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{member.role}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {member.availability}
                      </p>
                      <div className="text-xs text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {member.bio}
                      </div>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`mailto:${member.email}`}
                          className="text-xs text-green-600 hover:text-green-800 inline-flex items-center"
                        >
                          <Mail size={12} className="mr-1" /> Send Email
                        </Link>
                        <Link
                          to="#"
                          className="text-xs text-green-600 hover:text-green-800 inline-flex items-center ml-3"
                        >
                          <MessageSquare size={12} className="mr-1" /> Chat
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 bg-green-50 rounded-2xl p-6 border border-green-100">
                  <h4 className="font-semibold mb-2 text-green-700">
                    Schedule a Consultation
                  </h4>
                  <p className="text-gray-700 text-sm mb-4">
                    Want a personalized hair care solution? Book a virtual
                    consultation with our experts.
                  </p>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-full">
                          <Clock size={20} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">
                            Virtual Consultation
                          </p>
                          <p className="text-gray-500 text-sm">
                            30 minutes with a hair specialist
                          </p>
                        </div>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className="mt-12 bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
          data-animate
        >
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
            <h3 className="text-xl font-semibold">
              Frequently Asked Questions
            </h3>
            <p className="text-green-100 mt-1">
              Quick answers to common questions
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How does the Hairbotics AI analyzer work?",
                  answer:
                    "Our AI analyzer uses computer vision technology to analyze your hair's condition, texture, and needs from photos you upload. It then provides personalized care recommendations and product suggestions.",
                },
                {
                  question: "Can I return products if I'm not satisfied?",
                  answer:
                    "Yes! We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, you can return it for a full refund within 30 days of delivery.",
                },
                {
                  question: "How often are new products released?",
                  answer:
                    "We release new formulations and products quarterly, based on seasonal needs and the latest hair care technology advancements.",
                },
                {
                  question: "Do you offer international shipping?",
                  answer:
                    "Yes, we ship to over 30 countries worldwide. Shipping rates and delivery times vary by location. You can check specific details during checkout.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-green-50/50 p-4 rounded-xl border border-green-100 hover:shadow-md transition-all"
                  data-animate
                >
                  <h4 className="font-medium text-green-700 mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="#"
                className="text-green-600 hover:text-green-800 font-medium text-sm inline-flex items-center"
              >
                View all FAQs <ExternalLink size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className="mt-12 rounded-2xl overflow-hidden border border-green-100 shadow-lg"
          data-animate
        >
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Find Us</h3>
            <Link
              to={contactInfo.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-white text-green-600 px-3 py-1 rounded-full hover:bg-green-50 transition-colors"
            >
              Get Directions
            </Link>
          </div>
          <iframe
            className="w-full h-72"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867615.205929471!2d74.12786929510786!3d18.799580515944868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v1745433332568!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Newsletter */}
        <div
          className="mt-12 bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
          data-animate
        >
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-gray-600">
                Get hair care tips, product updates, and exclusive offers
                straight to your inbox.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3 text-center">
                By subscribing, you agree to our Privacy Policy. You can
                unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center" data-animate>
          <p className="text-sm text-gray-600">
            © 2025 Hairbotics. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500">
            <Link to="#" className="hover:text-green-600 transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-green-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-green-600 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Styled CSS for animations */}
        <style>
          {`
    [data-animate] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }

    [data-animate].animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `}
        </style>
      </div>
    </div>
  );
};

export default ContactUs;
