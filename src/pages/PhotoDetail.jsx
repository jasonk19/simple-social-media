import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/user/userSlice";
import Layout from "../components/layout/Layout";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/pages/PhotoDetail.scss";
import Loading from "./Loading";

export const PhotoDetail = () => {
  const { id, albumId, photoId } = useParams();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(id));
  }, []);

  const locations = [
    {
      link: "/user/" + id,
      name: user.users.name,
    },
    {
      link: `/user/${id}/album/${albumId}`,
      name: user.users.albums.find((album) => album.albumId === Number(albumId))
        .title,
    },
    {
      link: "",
      name: user.users.albums
        .find((album) => album.albumId === Number(albumId))
        .photos.find((photo) => photo.id === Number(photoId)).title,
    },
  ];

  const imageUrl = user.users.albums
    .find((album) => album.albumId === Number(albumId))
    .photos.find((photo) => photo.id === Number(photoId)).url;
  const imageAlt = user.users.albums
    .find((album) => album.albumId === Number(albumId))
    .photos.find((photo) => photo.id === Number(photoId)).title;
  return (
    <div className="photo-detail-page">
      {user.loading && <Loading />}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users ? (
        <Layout
          locations={locations}
          header={
            user.users.albums
              .find((album) => album.albumId === Number(albumId))
              .photos.find((photo) => photo.id === Number(photoId)).title
          }
        >
          <div className="photo-detail">
            <TransformWrapper>
              <TransformComponent>
                <img src={imageUrl} alt={imageAlt} />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </Layout>
      ) : null}
    </div>
  );
};
