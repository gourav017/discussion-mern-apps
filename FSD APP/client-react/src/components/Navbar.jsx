import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  let links = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/Questions",
      title: "Questions",
    },
    {
      to: "/login",
      title: "login",
    },
    {
      to: "/signup",
      title: "signup",
    },
  ];
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}} >
      {links.map((l) => (
        <NavLink to={l.to}>{l.title}</NavLink>
      ))}
    </div>
  );
};

export default Navbar;
