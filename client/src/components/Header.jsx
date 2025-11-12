import { useState } from "react";
import { Search, Menu, X, UserPlus, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore.js";
import Dropdown from "./Dropdown";
import useUserStore from "../store/userStore.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { user } = useUserStore();

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
    { name: "Projects", link: "/projects" },
  ];

  return (
    <nav className="bg-[var(--bg-colour)] sticky top-0 z-10 transition-colors duration-300 border-b border-[var(--border-colour)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-[var(--primary-colour)] transition-colors duration-300"
            >
              Piyush's Blog
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden sm:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[var(--primary-colour)]" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-[var(--border-colour)] rounded-lg leading-5 bg-[var(--bg-colour)] text-[var(--text-colour)] placeholder-[var(--text-muted-colour)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-colour)] focus:border-[var(--primary-colour)] sm:text-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.link}
                className="flex items-center text-[var(--text-colour)] hover:text-[var(--primary-colour)] px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons + Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isDarkMode ? (
              <Sun
                className="cursor-pointer text-[var(--primary-colour)] hover:text-[var(--primary-hover-colour)] transition-colors duration-300"
                onClick={toggleDarkMode}
              />
            ) : (
              <Moon
                className="cursor-pointer text-[var(--primary-colour)] hover:text-[var(--primary-hover-colour)] transition-colors duration-300"
                onClick={toggleDarkMode}
              />
            )}
            {user ? (
              <div
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-9 rounded-full overflow-hidden cursor-pointer"
              >
                <img src={`${user.imgURL}`} alt={user.name} />
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center bg-[var(--primary-colour)] hover:bg-[var(--primary-hover-colour)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 shadow-sm"
              >
                <UserPlus className="h-5 w-5 mr-1" /> Sign In
              </Link>
            )}
            {isUserDropdownOpen && <Dropdown setIsUserDropdownOpen={setIsUserDropdownOpen} />}
          </div>

          {/* Mobile Menu + Theme Toggle + Avatar */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <div
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-8 rounded-full overflow-hidden cursor-pointer"
              >
                <img src={user.imgURL} alt="" />
              </div>
            )}
            {isUserDropdownOpen && <Dropdown />}

            {isDarkMode ? (
              <Sun
                className="cursor-pointer text-[var(--primary-colour)] hover:text-[var(--primary-hover-colour)] transition-colors duration-300"
                onClick={toggleDarkMode}
              />
            ) : (
              <Moon
                className="cursor-pointer text-[var(--primary-colour)] hover:text-[var(--primary-hover-colour)] transition-colors duration-300"
                onClick={toggleDarkMode}
              />
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-colour)] hover:text-[var(--primary-colour)] hover:bg-[var(--hover-bg-colour)] focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--bg-colour)] border-t border-[var(--border-colour)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Search Bar */}
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[var(--primary-colour)]" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-[var(--border-colour)] rounded-lg leading-5 bg-[var(--bg-colour)] text-[var(--text-colour)] placeholder-[var(--text-muted-colour)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-colour)] focus:border-[var(--primary-colour)] sm:text-sm transition-all duration-300"
              />
            </div>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.link}
                className="flex items-center text-[var(--text-colour)] hover:bg-[var(--hover-bg-colour)] hover:text-[var(--primary-colour)] px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex flex-col space-y-2 mt-3 pt-3 border-t border-[var(--border-colour)]">
              {!user && (
                <Link
                  to="/signin"
                  className="flex items-center justify-center bg-[var(--primary-colour)] hover:bg-[var(--primary-hover-colour)] text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-300 shadow-md"
                >
                  <UserPlus className="h-5 w-5 mr-2" /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
