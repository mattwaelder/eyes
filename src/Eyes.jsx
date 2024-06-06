import React from "react";

const Eyes = ({ image, width, height }) => {
  return (
    <img
      src={image}
      alt="eyes"
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        top: "150px",
        textAlign: "center",
        zindex: 20,
        width: width,
        height: height,
      }}
    ></img>
  );
};

export default Eyes;
