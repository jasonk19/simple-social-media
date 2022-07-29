import React from "react";
import "../../styles/components/common/Header.scss";

const Header = ({ header }) => {
  return (
    <div className="header">
      <h2>{header}</h2>
    </div>
  );
};

export default Header;
