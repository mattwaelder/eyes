import React from "react";

const Pupils = ({ image, width, height, translation }) => {
  console.log(translation);
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
          width: width,
          height: height,
          // transform: `translate(${translation.x}px, ${translation.y}px)`,
          transform: `translate(${translation.movementX}px, ${translation.movementY}px)`,
        }}
      ></img>
    </div>
  );
};

export default Pupils;
