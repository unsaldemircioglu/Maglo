{
  /* React Propeties */
}
import React, { useEffect, useState } from "react";
{
  /* Style */
}
import "./Styles/Dashboard_navbar.scss";
{
  /* Components */
}
import { CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
{
  /* Firebase Config */
}
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

    {/* Catch to firebase name data */}
  const fullName = user?.displayName ?? "";
  const initials = fullName ? getInitials(fullName) : "CN";

  return (
    <div className="navbar">
      <div className="top-bar">
        {/* Header Title */}
        <div className="header">Dashboard</div>
        {/* End Of Box Navbar(right side) */}
        <div className="nav-icons-menu">
          {/* Icons */}
          <CiSearch className="nav-icon" />
          <IoNotifications className="nav-icon" />
          {/* Profile Picture */}
          <div className="profile">
            <Avatar>
              <AvatarImage
                src={
                  user?.photoURL ??
                  "https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg"
                }
                alt={fullName}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {/* User Full Name */}
            <span className="username">{fullName || `User`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/