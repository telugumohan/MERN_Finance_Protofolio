import React, { useEffect, useState } from "react";
import { navItems } from "../../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../features/userSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutAction({ type: "LOGOUT", payload: null }));
    localStorage.setItem("profile", null);
    //setProfile(JSON.parse(localStorage.getItem('profile')));
    navigate("/");
  };

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch, navigate, profile?.token, location]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = profile?.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        // Check if the token is expired
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          // Dispatch logout action
          dispatch(logoutAction({ type: "LOGOUT", payload: null }));
          // Clear localStorage and update profile state
          localStorage.removeItem("profile");
          setProfile(null);
          navigate("/"); // Redirect to the login page
        }
      }
    };
  
    checkTokenExpiry();
    const intervalId = setInterval(checkTokenExpiry, 60000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, navigate, profile]);
  

  return (
    <header>
      <nav className="flex justify-between items-center px-8 py-2 bg-[#8B7F72] absolute w-full z-20">
        <div className="font-medium text-lg font-mono cursor-pointer">
          My Protofolio
        </div>
        <div>
          <ul className="flex justify-between items-center space-x-10">
            {navItems.map((navItem) => (
              <li
                key={navItem.navLink}
                className="font-medium text-lg font-mono cursor-pointer"
              >
                <Link to={navItem.navLink} className="cursor-pointer">
                  {navItem.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-medium text-lg font-mono">
          {!profile ? (
            <button className="flex justify-center items-center px-3 py-2 bg-[#BBAA99] cursor-pointer">
              <Link to={"/login"} className="cursor-pointer">
                Login
              </Link>
            </button>
          ) : (
            <div className="flex justify-between items-center space-x-4">
              <p>{profile.user.name}</p>
              <button
                className="flex justify-center items-center px-3 py-2 bg-red-500 cursor-pointer text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
