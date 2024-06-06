import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
//import cocossd pre-trained object detection
import * as cocossd from "@tensorflow-models/coco-ssd";
//import webcam
import Webcam from "react-webcam";

//components for each layer of image
import Eyes from "./Eyes.jsx";
import Pupils from "./Pupils.jsx";
import Girl from "./Girl.jsx";
import { lookAt } from "./helpers.js";

/* for effect, layer like:
  eyeball w/out pupils
  pupils only
  rest of image w/out eyes
*/
const eyes_img = require("./images/creepy_girl_eyes.png");
const pupils_img = require("./images/creepy_girl_pupils.png");
const girl_img = require("./images/creepy_girl_no_eyes.png");
const frame = require("./images/frame.png");

function App() {
  const webcamRef = useRef(null);

  const frameWidth = 640;
  const frameHeight = 640;
  const refreshRateMS = 3000; //refresh rate of app, in ms (100ms === 10/s)
  //state for eye translation
  const [translation, setTranslation] = useState({
    movementX: 0,
    movementY: 0,
  });

  //detect objects in view at interval
  const runCoco = async () => {
    const network = await cocossd.load();
    //refresh in ms (framerate)
    setInterval(() => {
      detect(network);
    }, refreshRateMS);
  };

  const detect = async (network) => {
    //if video, get video properties
    if (
      typeof webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      //ensure dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //detect objects in video from network
      const objects = await network.detect(video);
      //objects = array of obj: {bbox [], class str, score num}

      //retrieve eye movements
      let movement = lookAt(objects, frameWidth, frameHeight);
      if (!movement || !movement.movementX || !movement.movementY) return;
      //update eye position state
      if (movement !== undefined) {
        let { movementX, movementY } = movement;
        setTranslation({ movementX, movementY });
      }
    }
  };

  //spool up coco
  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <div>
        {/* <h1>{`X: ${translation.movementX}, Y: ${translation.movementY}`}</h1> */}
      </div>
      <div>
        <Webcam
          ref={webcamRef}
          muted={true}
          mirrored={false}
          style={{
            width: frameWidth,
            height: frameHeight,
            display: "none",
          }}
        />
        <Eyes image={eyes_img} width={frameWidth} height={frameHeight} />
        <Pupils
          image={pupils_img}
          width={frameWidth}
          height={frameHeight}
          translation={translation}
        />
        <Girl image={girl_img} width={frameWidth} height={frameHeight} />
        <img
          src={frame}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 0,
            width: "900px",
            height: "900px",
          }}
        ></img>
      </div>
      <footer>
        <p>Frame and Background Designed by Freepik</p>
      </footer>
    </div>
  );
}

export default App;

//////////////////////////////////////////////////////////////////////////
/////////////       TO DO     ////////////////
/////////////////////////////////////////////////////////////////////////
/*

YO should i not do a creepy girl? maybe i can make something goofier, or have it swap by preference? :thinking:

WORKING
now that the eyes can move, theres some things i can do:
  keep it as is and just clean up the code
  smooth out the animation and adjust the gaze to be more head level
  implement this on phones to work with the front facing camera
  pretty it up w/ a picture frame and a background wall


so i just was testing it out with the slow eye refresh rate, and because its really dark in here she got stuck looking far to one side and i couldnt get her to look strait. i turned around to look at the ligth over my shoulder and said out loud that it must be too dark in here for it to work, but when i turned around she was looking right at me and it was a bit spooky man.

*/
