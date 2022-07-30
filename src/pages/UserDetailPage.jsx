import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams, Link } from "react-router-dom";
import { fetchUsers } from "../features/user/userSlice";
import "../styles/pages/UserDetailPage.scss";
import Loading from "./Loading";

export const UserDetailPage = () => {
  const { id } = useParams();

  const [isDetail, setIsDetail] = useState(true);
  const [isAlbum, setIsAlbum] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(id));
  }, []);

  const handleOpenDetail = () => {
    setIsAlbum(false);
    setIsDetail(true);
  };

  const handleOpenAlbum = () => {
    setIsDetail(false);
    setIsAlbum(true);
  };

  const locations = [
    {
      link: "",
      name: isDetail ? "User Detail" : "User Albums",
    },
  ];

  return (
    <div className="user-detail-page">
      {user.loading && <Loading />}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users ? (
        <Layout header={user.users.name} locations={locations}>
          <div className="user-detail-container">
            <div className="button-container">
              <button onClick={handleOpenDetail}>User Detail</button>
              <button onClick={handleOpenAlbum}>Album</button>
            </div>
            {isDetail && (
              <div className="user-detail">
                <h3>User Detail</h3>
                <p className="address">Address</p>
                <div className="address-email-company">
                  <div className="keys">
                    <p className="key">City</p>
                    <p className="key">Street</p>
                    <p className="key">Suite</p>
                    <p className="key">Zipcode</p>
                    <br />
                    <p className="key">Email</p>
                    <p className="key">Company</p>
                  </div>
                  <div className="value">
                    {user.users.address && (
                      <>
                        <p>{user.users.address.city}</p>
                        <p>{user.users.address.street}</p>
                        <p>{user.users.address.suite}</p>
                        <p>{user.users.address.zipcode}</p>
                      </>
                    )}
                    <br />
                    <p>{user.users.email}</p>
                    <p>{user.users.company}</p>
                  </div>
                </div>
              </div>
            )}
            {isAlbum && (
              <div className="album-container">
                {user.users.albums.length &&
                  user.users.albums.map((album) => {
                    const albumThumbnail = album.photos[0].thumbnailUrl;
                    return (
                      <Link to={`album/${album.albumId}`} className="album">
                        <img src={albumThumbnail} alt="Album Thumbnail"></img>
                        <p>{album.title}</p>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </Layout>
      ) : null}
    </div>
  );
};
