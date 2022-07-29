import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/PostsPage.scss";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/post/postSlice";

export const PostsPage = () => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="posts-page">
      <Layout header="Posts">
        {post.loading && <div>Loading</div>}
        {!post.loading && post.error ? <div>Error: {post.error}</div> : null}
        {!post.loading && post.posts.length ? (
          <div className="posts-container">
            {post.posts.map((post) => (
              <Link to={`/${post.id}`} className="post">
                <div className="user">
                  <p className="name">{post.name}</p>
                  <p className="company">From: {post.company}</p>
                </div>
                <div className="content">
                  <p className="title">{post.title}</p>
                  <p className="body">{post.body}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </Layout>
    </div>
  );
};
