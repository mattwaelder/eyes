import React from "react";

const Girl = ({ image, width, height }) => {
  return (
    <img
      src={image}
      alt="creepy girl"
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        top: "120px",
        textAlign: "center",
        zindex: 22,
        width: width,
        height: height,
        // display: "none",
      }}
    ></img>
  );
};

export default Girl;
