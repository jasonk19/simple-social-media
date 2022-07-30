import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUsers } from "../features/user/userSlice";
import Layout from "../components/layout/Layout";
import "../styles/pages/AlbumPage.scss";
import Pagination from "../components/common/Pagination";

export const AlbumPage = () => {
  const { id, albumId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  const indexOfLastPost = currentPage * photosPerPage;
  const indexOfFirstPost = indexOfLastPost - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(id));
    setPhotos(
      user.users.albums.find((album) => album.albumId === Number(albumId))
        .photos
    );
  }, []);

  const locations = [
    {
      link: "/user/" + id,
      name: user.users.name,
    },
    {
      link: "",
      name: user.users.albums.find((album) => album.albumId === Number(albumId))
        .title,
    },
  ];

  return (
    <div className="album-page">
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users ? (
        <Layout
          locations={locations}
          header={
            user.users.albums.find((album) => album.albumId === Number(albumId))
              .title
          }
        >
          <div className="album-container">
            {currentPhotos.map((photo) => {
              const photoId = photo.id;
              const photoThumbnailUrl = photo.thumbnailUrl;
              const photoTitle = photo.title;
              return (
                <Link to={`photos/${photoId}`} className="photo-card">
                  <div key={photoId}>
                    <img src={photoThumbnailUrl} alt={photoTitle} />
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination
            contentPerPage={photosPerPage}
            totalContent={photos.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </Layout>
      ) : null}
    </div>
  );
};
