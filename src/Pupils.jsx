import React from "react";

const Pupils = ({ image, translation }) => {
  return (
    <div>
      <img
        src={image}
        alt="pupils"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: "10%",
          textAlign: "center",
          zindex: 21,
          width: 640,
          height: 640,
          transform: `translate(${translation.x}px, ${translation.y}px)`,
        }}
      ></img>
    </div>
  );
};

export default Pupils;
