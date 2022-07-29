import React from "react";
import { Navbar, Header } from "../common";

const Layout = ({ children, header, locations }) => {
  return (
    <>
      <Navbar locations={locations} />
      <Header header={header} />
      {children}
    </>
  );
};

export default Layout;
