import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  FileText,
  Search,
  X,
  ChevronUp,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [highlightedTerms, setHighlightedTerms] = useState<string[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    // Calculate combined height of navbar and floating header
    const calculateHeaderHeight = () => {
      const navbar = document.querySelector("nav") as HTMLElement;
      const floatingHeader = document.querySelector(
        ".floating-header"
      ) as HTMLElement;

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const floatingHeaderHeight = floatingHeader
        ? floatingHeader.offsetHeight
        : 0;

      // Add some extra padding for comfort
      setHeaderHeight(navbarHeight + floatingHeaderHeight + 16);
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);

    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 500);

      // Find the current section in view
      const sections = document.querySelectorAll("[data-section]");
      let currentSection = "";

      sections.forEach((section) => {
        const htmlElement = section as HTMLElement;
        const sectionTop = htmlElement.offsetTop - headerHeight - 50; // Added additional offset
        const sectionHeight = htmlElement.offsetHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("data-section") || "";
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = termsData.sections
        .filter(
          (section) =>
            section.title.toLowerCase().includes(query) ||
            section.content.toLowerCase().includes(query)
        )
        .map((section) => section.id);

      setHighlightedTerms(results);
    } else {
      setHighlightedTerms([]);
    }
  }, [searchQuery]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
      // Adjust scroll position to account for the header height
      const yOffset = -headerHeight;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
      // Close mobile sidebar after selection
      setMobileSidebarOpen(false);
    }
  };

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

  // Function to highlight searched text
  const highlightText = (text: string, query: string): string => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(
      regex,
      '<mark class="bg-green-100 px-1 rounded">$1</mark>'
    );
  };

  interface SectionNavItemProps {
    section: TermsSection;
    isActive: boolean;
    isHighlighted: boolean;
    onClick: () => void;
  }

  const SectionNavItem: React.FC<SectionNavItemProps> = ({
    section,
    isActive,
    isHighlighted,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-green-100 text-green-700 font-medium"
          : isHighlighted
          ? "bg-green-50 text-green-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {section.title.replace(/^\d+\.\s*/, "")}
      {isHighlighted && !isActive && (
        <span className="ml-2 inline-flex items-center justify-center bg-green-600 text-white text-xs rounded-full h-5 w-5">
          •
        </span>
      )}
    </button>
  );

  interface TermsSectionComponentProps {
    section: TermsSection;
    isHighlighted: boolean;
    searchQuery: string;
  }

  const TermsSectionComponent: React.FC<TermsSectionComponentProps> = ({
    section,
    isHighlighted,
    searchQuery,
  }) => {
    let contentToDisplay = section.content;
    let titleToDisplay = section.title;

    if (searchQuery.trim()) {
      contentToDisplay = highlightText(section.content, searchQuery);
      titleToDisplay = highlightText(section.title, searchQuery);
    }

    return (
      <div
        id={`section-${section.id}`}
        data-section={section.id}
        style={{ scrollMarginTop: `${headerHeight}px` }}
        className={`${
          isHighlighted
            ? "bg-green-50/50 -mx-4 md:-mx-8 px-4 md:px-8 py-6 rounded-lg"
            : ""
        }`}
      >
        <h2
          className="text-xl md:text-2xl font-semibold text-green-700 mb-4"
          dangerouslySetInnerHTML={{ __html: titleToDisplay }}
        />
        <p
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: contentToDisplay }}
        />
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-16 md:pt-20">
        {" "}
        {/* Add padding to the top to account for navbar */}
        {/* Floating Header */}
        <div className="sticky top-16 md:top-20 z-20 bg-white border-b border-green-100 shadow-sm floating-header">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              <h1 className="text-base md:text-lg font-semibold text-green-700 truncate">
                Terms of Service
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {/* Mobile - Toggle sidebar button */}
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>

              {/* Search Bar */}
              <div className="relative flex items-center">
                {!isSearching ? (
                  <button
                    onClick={() => setIsSearching(true)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Search terms"
                  >
                    <Search className="h-5 w-5 text-gray-600" />
                  </button>
                ) : (
                  <div className="flex items-center bg-gray-100 rounded-full pl-3 pr-1 py-1">
                    <Search className="h-4 w-4 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search terms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none w-32 md:w-40 text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setIsSearching(false);
                        setSearchQuery("");
                        setHighlightedTerms([]);
                      }}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Container */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-8">
          {/* Breadcrumb */}
          <div className="mb-4 md:mb-6 flex items-center text-xs md:text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">
              Hairbotics
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 mx-1" />
            <span className="text-green-600 font-medium">Terms of Service</span>
          </div>

          <div className="relative flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={`${
                mobileSidebarOpen
                  ? "fixed left-0 top-0 h-full z-50 w-64 transform translate-x-0"
                  : "fixed left-0 top-0 h-full z-50 w-64 transform -translate-x-full"
              } md:static md:block md:w-64 md:shrink-0 md:transform-none transition-transform duration-300 ease-in-out`}
            >
              <div
                className="bg-white border border-green-100 shadow-lg rounded-r-2xl md:rounded-2xl p-5 h-full md:sticky"
                style={{ top: `${headerHeight}px` }}
              >
                <div className="mb-4 pb-3 border-b border-green-100">
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="font-medium text-green-700">
                    {termsData.lastUpdated}
                  </p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-green-700">
                    On this page
                  </h3>
                  {/* Close button for mobile */}
                  <button
                    className="md:hidden p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="max-h-80 md:max-h-96 overflow-y-auto pr-2 space-y-1">
                  {termsData.sections.map((section) => (
                    <SectionNavItem
                      key={section.id}
                      section={section}
                      isActive={activeSection === section.id}
                      isHighlighted={highlightedTerms.includes(section.id)}
                      onClick={() => scrollToSection(section.id)}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-green-100">
                  <a
                    href="#"
                    className="text-sm flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF version
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header Card */}
              <div className="relative bg-gradient-to-r from-green-700 to-green-500 text-white px-4 md:px-8 py-8 md:py-12 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl mb-6 md:mb-8 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-16 md:w-32 h-16 md:h-32 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/4"></div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 relative z-10">
                  Terms of Service
                </h1>
                <p className="text-green-50 max-w-lg text-sm md:text-base relative z-10">
                  These Terms of Service govern your use of Hairbotics and our
                  services. Please read them carefully before using our
                  platform.
                </p>
                <p className="mt-4 md:mt-6 text-xs md:text-sm text-green-100 relative z-10">
                  Last updated: {termsData.lastUpdated}
                </p>
              </div>

              {/* Table of Contents (Mobile only) */}
              <div className="md:hidden mb-6 bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-green-700">Contents</h3>
                  <button
                    className="text-green-600 text-sm font-medium"
                    onClick={() => setMobileSidebarOpen(true)}
                  >
                    Jump to section
                  </button>
                </div>
                <div className="space-y-2">
                  {termsData.sections.slice(0, 3).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="block w-full text-left text-sm px-2 py-1 text-gray-700 hover:text-green-600"
                    >
                      {section.title}
                    </button>
                  ))}
                  {termsData.sections.length > 3 && (
                    <button
                      className="text-sm text-green-600 font-medium flex items-center px-2 py-1"
                      onClick={() => setMobileSidebarOpen(true)}
                    >
                      View all {termsData.sections.length} sections
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>

              {/* Introduction */}
              <div className="bg-white rounded-xl p-4 md:p-8 border border-green-100 shadow-sm md:shadow-md mb-6 md:mb-8">
                <p className="text-gray-700 text-sm md:text-base">
                  Welcome to Hairbotics. These Terms of Service ("Terms") govern
                  your access to and use of our services, including our website,
                  applications, and other services that link to these Terms
                  (collectively, the "Services"). By using our Services, you
                  agree to be bound by these Terms and our Privacy Policy.
                </p>
              </div>

              {/* All Sections */}
              <div
                id="all-sections"
                className="bg-white rounded-xl p-4 md:p-8 border border-green-100 shadow-sm md:shadow-md space-y-8 md:space-y-12"
              >
                {termsData.sections.map((section) => (
                  <TermsSectionComponent
                    key={section.id}
                    section={section}
                    isHighlighted={highlightedTerms.includes(section.id)}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>

              {/* Additional Information Card */}
              <div className="mt-6 md:mt-8 bg-green-50 border border-green-200 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-green-700 mb-2 md:mb-3">
                  Have questions about our Terms?
                </h3>
                <p className="text-gray-700 text-sm md:text-base mb-4">
                  If you have any questions or concerns about these Terms,
                  please don't hesitate to contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm md:text-base"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/privacy"
                    className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm md:text-base"
                  >
                    View Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed right-4 md:right-8 bottom-4 md:bottom-8 p-2 md:p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all z-30"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        )}
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
