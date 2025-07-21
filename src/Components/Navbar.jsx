import React from "react";
import logo from "../assets/Group.svg";
import "../styles/navbar.css";

function Navbar({toggle}) {
  const toggleFunction = () => {
    toggle();
  }

  return (
    <>
      <nav>
        <img src={logo} alt="logo" />
        <div className="navigation">
          <ul>
            <li>Home</li>
            <li>Find Jobs</li>
            <li>Find Talents</li>
            <li>About Us</li>
            <li>Testimonials</li>
          </ul>
          <button className="createBtn" onClick={toggleFunction}>Create Jobs</button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
