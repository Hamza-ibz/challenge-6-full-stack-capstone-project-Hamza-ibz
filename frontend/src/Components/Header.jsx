import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.jpg";
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Header = ({ resetCart }) => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkLoggedIn();
  }, [location]);

  const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token !== null) {
      setLoggedIn(true);
      setIsAdmin(role === 'admin');
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedIn(false);
    setIsAdmin(false);
    resetCart();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isActive ? "bg-white shadow-md" : "bg-gray-200"
        } py-4 fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo and Home Link */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-lg font-semibold text-gray-800">
            FRESH GADGETS
          </span>
        </Link>

        {/* Centered Navigation Links */}
        <div className="flex-grow flex justify-center">
          <nav className="flex space-x-6 border border-gray-300 rounded-md overflow-hidden">
            <Link
              to="/"
              className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
            >
              Home
            </Link>
            {loggedIn ? (
              <>
                <Link
                  to="/update-password"
                  className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
                >
                  Update Password
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/"
                  className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer relative flex items-center"
        >
          <BsBag className="text-3xl text-gray-800" />
          <div className="bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -right-2 -top-2">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

