import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="app__navbar">
        <div className="app__navbar-logo"></div>
        <ul className="app__navbar-links">
          {["home", "about"].map((item) => (
            <li className="app__flex" key={`link-${item}`}>
              <div />
              <Link to={`/${item === "home" ? "" : item}`}>{item}</Link>
            </li>
          ))}
        </ul>
        <div className="app__navbar-sign-btns">
          <button>Sign in</button>
          <button>Sign in</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
