import React from "react";

const Girl = ({ image }) => {
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
        top: "10%",
        textAlign: "center",
        zindex: 22,
        width: 640,
        height: 640,
      }}
    ></img>
  );
};

export default Girl;
