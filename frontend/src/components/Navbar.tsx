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

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          {isLogoLoaded ? (
            <img
              src={logo}
              alt="Hairbotics"
              onError={() => setIsLogoLoaded(false)}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          ) : (
            "Hairbotics"
          )}
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className={styles.toggleButton}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.openMenu : styles.closedMenu
          }`}
        >
          <li>
            <Link to="/" className={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link to="/pricing" className={styles.link}>
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/team" className={styles.link}>
              Team
            </Link>
          </li>
        </ul>

        <div className={styles.actionButtons}>
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

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/dashboard/analysis");
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
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
