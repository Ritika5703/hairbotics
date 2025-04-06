const NavbarStyles = {
  navbar: "bg-white text-black py-4 shadow-md",
  container:
    "container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6",
  logo: "text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300",
  toggleButton: "text-3xl text-green-600 focus:outline-none",
  navLinks:
    "flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 absolute md:relative bg-white md:bg-transparent w-full md:w-auto left-0 transition-all duration-300 ease-in-out",
  openMenu: "top-20 p-6 shadow-md rounded-b-md",
  closedMenu: "top-[-300px] md:top-auto hidden md:flex",
  link: "relative group transition-colors duration-300 hover:text-green-600",
  actionButtons:
    "mt-6 md:mt-0 flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0",
  getStartedButton:
    "bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-300",
  loginButton:
    "border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-100 transition-all duration-300",
};

export default NavbarStyles;
