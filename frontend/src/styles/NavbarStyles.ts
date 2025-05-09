const styles = {
  navbar: "bg-white py-2 fixed w-full top-0 z-50",
  container:
    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center",
  logo: "flex items-center text-xl font-bold text-blue-600",
  toggleButton:
    "text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100",

  // Nav links for desktop and mobile
  navLinks: "md:flex md:items-center md:space-x-4 transition-all duration-300",
  openMenu:
    "absolute top-16 left-0 right-0 flex flex-col bg-white shadow-md py-4 px-4 space-y-3 md:relative md:top-0 md:shadow-none md:flex-row md:py-0 md:space-y-0",
  closedMenu: "hidden md:flex md:items-center",
  link: "text-gray-700 hover:text-green-600 py-2 px-3 rounded-md transition-colors duration-200 text-sm md:text-base font-medium",

  // Action buttons (login, signup, dashboard)
  actionButtons: "hidden md:flex md:items-center md:space-x-3",
  loginButton:
    "text-gray-700 border border-gray-300 py-1 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium",
  getStartedButton:
    "bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium",
  dashboardButton:
    "text-green-600 border border-green-600 py-1 px-4 rounded-md hover:bg-green-50 transition-colors text-sm font-medium mr-2",

  // Mobile specific styles
  mobileActionButton:
    "w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-sm font-medium my-1",
};

export default styles;
