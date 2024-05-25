import React from "react";

const Eyes = ({ image }) => {
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
        top: "10%",
        textAlign: "center",
        zindex: 20,
        width: 640,
        height: 640,
      }}
    ></img>
  );
};

export default Eyes;
