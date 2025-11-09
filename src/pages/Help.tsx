import React from 'react'
import { NavLink } from "react-router";
import { RiLogoutCircleRFill } from "react-icons/ri";

function Help() {
  return (
    <div>
      <h1>Help Menu</h1>

        <NavLink to="/login" end>
                  <li className="menu-item">
                    <RiLogoutCircleRFill />
                    Logout
                  </li>
        </NavLink>
    </div>
  )
}

export default Help


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/