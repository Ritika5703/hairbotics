const NavbarStyles = {
  navbar: "bg-white text-black py-2 fixed top-0 left-0 w-full z-30",
  container:
    "max-w-screen-xl mx-auto flex flex-wrap justify-between items-center px-2 md:px-6",
  logo: "text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300",
  toggleButton: "text-3xl text-green-600 focus:outline-none md:hidden block",
  navLinks:
    "w-full md:w-auto flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 md:relative absolute bg-white md:bg-transparent left-0 transition-all duration-300 ease-in-out z-40 md:top-auto",
  openMenu: "top-[70px] p-6 shadow-md rounded-b-md block",
  closedMenu: "top-[-400px] hidden md:flex",

  link: "relative group transition-colors duration-300 hover:text-green-600 text-sm md:text-base",
  actionButtons:
    "mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 w-full md:w-auto",
  getStartedButton:
    "bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 w-full md:w-auto",
  loginButton:
    "border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-100 transition-all duration-300 w-full md:w-auto",
};

export default NavbarStyles;
