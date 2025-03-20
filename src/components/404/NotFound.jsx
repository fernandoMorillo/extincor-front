import React from "react";

import imageNotFound from "../../assets/img/not-found.jpg";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <img className="not-found__img" src={imageNotFound} alt="Not Found" />
    </div>
  );
};

export default NotFound;
