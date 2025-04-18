const DashboardStyles = {
  // Main container
  container: "min-h-screen flex flex-col lg:flex-row bg-white",

  // Mobile header
  mobileToggle:
    "flex lg:hidden justify-between items-center bg-gray-800 text-white px-4 py-3 sticky top-0 z-40",
  mobileTitle: "text-xl sm:text-2xl font-bold",
  toggleButton: "focus:outline-none",
  toggleIcon: "text-xl sm:text-2xl",

  // Sidebar
  sidebar:
    "bg-white text-gray-700 w-64 py-4 sm:py-6 px-3 sm:px-4 shadow-md flex flex-col transition-transform duration-300",
  logoContainer: "flex items-center justify-center py-3 sm:py-4 mb-4 sm:mb-6",
  logoImage: "w-8 h-8 sm:w-10 sm:h-10",
  logoText: "text-xl sm:text-2xl font-bold text-gray-800 ml-3",

  // Navigation
  nav: "space-y-2 sm:space-y-4 flex-1",
  navLink:
    "flex items-center py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  navIcon: "mr-3 text-gray-600",
  navText: "text-sm sm:text-base font-medium",
  activeLink: "bg-green-100 text-gray-900",

  // Sidebar footer
  sidebarFooter: "mt-auto border-t border-gray-300 p-4",
  credits: "text-sm font-medium text-gray-600 mb-2",
  avatarContainer: "cursor-pointer",
  avatarImage:
    "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300",
  userInfo: "ml-3",
  userName: "text-sm font-semibold text-gray-800",
  userEmail: "text-xs text-gray-500",

  // User card
  userCard:
    "absolute right-4 bottom-20 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50 w-56",
  cardHeader: "flex items-center mb-2",
  cardAvatar:
    "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 mr-2",
  cardUserName: "font-semibold text-sm",
  cardUserEmail: "text-xs text-gray-500",

  // Main content
  mainContent: "flex-1 p-4 sm:p-6 md:p-8 lg:p-10",
};

export default DashboardStyles;
