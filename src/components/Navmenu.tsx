import React from "react";
import "./Styles/Navmenu.scss";
import Logo from "./Global/Logo";
import { AiFillHome } from "react-icons/ai";
import { BiSolidChart } from "react-icons/bi";
import { SiNovu } from "react-icons/si";
import { IoWalletSharp, IoHelpBuoySharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface NavmenuProps {
  closeMenu?: () => void;
}

{/* NavMenu Content */}
const Navmenu: React.FC<NavmenuProps> = ({ closeMenu }) => {
  const menulist = [
    { name: "Dashboard", path: "/dashboard", icon: <AiFillHome /> },
    { name: "Transactions", path: "/transactions", icon: <BiSolidChart /> },
    { name: "Invoices", path: "/invoices", icon: <SiNovu /> },
    { name: "My Wallets", path: "/wallets", icon: <IoWalletSharp /> },
    { name: "Settings", path: "/settings", icon: <IoIosSettings /> },
  ];

  return (
    <div className="navmenu-container">
      <Logo /> {/* Global Logo */}
      <ul className="navmenu-list">
        {menulist.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className="navmenu-item"
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navmenu-footer">
        {/* Help Page */}
        <a
          href="https://github.com/unsaldemircioglu/Maglo-Demo-Application-Help-Docs"
          target="_blank"
          rel="noopener noreferrer"
          className="navmenu-item"
        >
          <IoHelpBuoySharp />
          <span>Help</span>
        </a>
        {/* Logout */}
        <NavLink to="/login" className="navmenu-item" onClick={closeMenu}>
          <RiLogoutCircleRFill />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navmenu;


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/