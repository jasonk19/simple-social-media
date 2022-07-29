import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/common/Navbar.scss";

const Navbar = ({ locations }) => {
  return (
    <div className="navbar">
      <h3>Simple Social Media</h3>
      <div className="breadcrumbs">
        <Link to="/" className="link">
          <p>Posts</p>
        </Link>
        {locations &&
          locations.map((location) => (
            <>
              <p>/</p>
              <Link to={location.link} className="link">
                <p>{location.name}</p>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
