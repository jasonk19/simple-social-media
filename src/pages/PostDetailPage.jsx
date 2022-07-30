import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { fetchPostDetail } from "../features/postDetail/postDetailSlice";

import "../styles/pages/PostDetailPage.scss";
import Loading from "./Loading";

export const PostDetailPage = () => {
  const { id } = useParams();

  const postDetail = useSelector((state) => state.postDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetail(id));
  }, []);

  const locations = [
    {
      link: "",
      name: postDetail.detail.title,
    },
  ];

  return (
    <div className="post-detail-page">
      {postDetail.loading && <Loading />}
      {!postDetail.loading && postDetail.error ? (
        <div>Error: {postDetail.error}</div>
      ) : null}
      {!postDetail.loading && postDetail.detail ? (
        <Layout header={postDetail.detail.title} locations={locations}>
          <div className="post-detail">
            <Link to={`/user/${postDetail.detail.userId}`} className="link">
              <p className="post-detail-author">By: {postDetail.detail.name}</p>
            </Link>
            <div className="post-detail-body">
              <p>{postDetail.detail.body}</p>
            </div>
            <div className="comments-container">
              <h4>Comments</h4>
              <div className="comments">
                {postDetail.detail.comments &&
                  postDetail.detail.comments.map((comment) => (
                    <div className="comment">
                      <p className="author">{comment.name}</p>
                      <p className="body">{comment.body}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Layout>
      ) : null}
    </div>
  );
};
