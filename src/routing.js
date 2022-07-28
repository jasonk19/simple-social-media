import React from "react";

const Homepage = React.lazy(() =>
  import("./pages/Homepage").then((module) => ({ default: module.Homepage }))
);

const PageNotFound = React.lazy(() =>
  import("./pages/PageNotFound").then((module) => ({
    default: module.PageNotFound,
  }))
);

const PageNotFoundRouting = {
  title: "Page Not Found",
  path: "*",
  component: PageNotFound,
};

export const Routing = [
  {
    title: "Homepage",
    path: "/",
    component: Homepage,
  },
  PageNotFoundRouting,
];
