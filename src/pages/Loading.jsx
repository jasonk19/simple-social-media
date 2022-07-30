import React from "react";
import "../styles/pages/Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loader-box">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
