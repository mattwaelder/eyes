import React from "react";

const Pupils = ({ image, width, height, translation }) => {
  /*  THE TRANSITION BELOW EFFECTS THE MOVEMENT OF THE EYES, IN PARTICULAR THE DELAY */
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
          top: "5vh",
          textAlign: "center",
          zindex: 21,
          width: width,
          height: height,
          transform: `translate(${translation.movementX}px, ${translation.movementY}px)`,
          transition: "all 200ms ease-out",
        }}
      ></img>
    </div>
  );
};

export default Pupils;
