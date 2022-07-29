import React from "react";

const PostsPage = React.lazy(() =>
  import("./pages/PostsPage").then((module) => ({ default: module.PostsPage }))
);

const PostDetailPage = React.lazy(() =>
  import("./pages/PostDetailPage").then((module) => ({
    default: module.PostDetailPage,
  }))
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
    title: "Posts",
    path: "/",
    component: PostsPage,
  },
  {
    title: "Post's Detail",
    path: "/:id",
    component: PostDetailPage,
  },
  PageNotFoundRouting,
];
