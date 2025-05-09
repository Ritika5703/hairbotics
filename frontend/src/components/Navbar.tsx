import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useAuth, useClerk } from "@clerk/clerk-react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "../styles/NavbarStyles";
import { logo } from "../assets/index";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      // Close mobile menu if open
      if (!event.composedPath().includes(document.querySelector("nav")!)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = [
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#6366F1",
      "#EC4899",
      "#EF4444",
      "#14B8A6",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          {isLogoLoaded ? (
            <img
              src={logo}
              alt="Hairbotics"
              onError={() => setIsLogoLoaded(false)}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
            />
          ) : (
            "Hairbotics"
          )}
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={styles.toggleButton}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.openMenu : styles.closedMenu
          }`}
        >
          <li>
            <Link
              to="/about"
              className={styles.link}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          {/* <li>
            <Link
              to="/services"
              className={styles.link}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </li> */}
          <li>
            <Link
              to="/team"
              className={styles.link}
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
          </li>
          {isSignedIn && (
            <li className="md:hidden">
              <Link
                to="/dashboard/analysis"
                className={styles.link}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          )}
          {!isSignedIn && (
            <li className="md:hidden">
              <button
                className={styles.mobileActionButton}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </button>
            </li>
          )}
          {!isSignedIn && (
            <li className="md:hidden">
              <button
                className={styles.mobileActionButton}
                onClick={() => handleNavigation("/signup")}
              >
                Get Started
              </button>
            </li>
          )}
        </ul>

        <div className={`${styles.actionButtons} items-center`}>
          {isSignedIn && (
            <button
              className={`${styles.dashboardButton} hidden md:block`}
              onClick={() => navigate("/dashboard/analysis")}
            >
              Dashboard
            </button>
          )}

          {!isSignedIn ? (
            <>
              <button
                className={styles.getStartedButton}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
              <button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar with initials and fallback */}
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="User"
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                />
              ) : (
                <div
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: getRandomColor(user?.fullName || "U"),
                  }}
                >
                  {getInitials(user?.fullName || "User")}
                </div>
              )}

              {/* Dropdown - simplified to only contain logout */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      signOut();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
