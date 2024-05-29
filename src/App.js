import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
//import cocossd pre-trained object detection
import * as cocossd from "@tensorflow-models/coco-ssd";
//import webcam
import Webcam from "react-webcam";

import Eyes from "./Eyes.jsx";
import Pupils from "./Pupils.jsx";
import Girl from "./Girl.jsx";
import { lookAt } from "./helpers.js";

const eyes_img = require("./images/creepy_girl_eyes.png");
const pupils_img = require("./images/creepy_girl_pupils.png");
const girl_img = require("./images/creepy_girl_no_eyes.png");

function App() {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  let detections = [];
  const desiredObject = "cell phone"; // "cell phone"
  let confidenceFloor = 0.51;
  const frameWidth = 640;
  const frameHeight = 640;

  const [translation, setTranslation] = useState({ x: 0, y: 0 });

  const runCoco = async () => {
    const network = await cocossd.load();
    //refresh in ms (framerate)
    setInterval(() => {
      detect(network);
    }, 1000); //100ms is 10/s
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

      //ensure video and canvas are same dimensions
      //cam
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      //canvas
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;

      //detect objects in video from network
      const objects = await network.detect(video);
      //array of obj: {bbox [], class str, score num}

      let pos = lookAt(objects, frameWidth, frameHeight);

      console.log(pos);
      //take the object that is most likely a person
      //find the center mass of the person from bbox
      //find percent of x and y values for that center mass point
      //set the translation with those percents for both x and y

      ///////////////////////////////
      //DO WORK ON OBJECT TO TRACK IT
    }
  };

  //spool up coco
  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <div>
        <Webcam
          ref={webcamRef}
          muted={true}
          mirrored={false}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: "10%",
            textAlign: "center",
            zindex: 0,
            width: frameWidth,
            height: frameHeight,
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

        {/* <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: "10%",
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 640,
          }}
        /> */}
      </div>
    </div>
  );
}

export default App;

//////////////////////////////////////////////////////////////////////////
/////////////       TO DO     ////////////////
/////////////////////////////////////////////////////////////////////////
/*

YO should i not do a creepy girl? maybe i can make something goofier, or have it swap by preference? :thinking:

rather than rendering the webcam, show an image on screen with blank eyes

draw eyes on the screen at default value

track 1 person
  this could be tricky, either pick based off of position or pick besed off of certainty. i think ill try certainty first and see how that behaves.

adjust eye location within bounds as target moves
  take loc of person, turn that into a percent of screen resolution (both x and y), move eyes to same percent of bounding box for eye movement.


change the image to 3 layers
1st layer for just the eyes (no pupils)
2nd layer for just the pupils (this layer translates)
3rd layer for girl w/ cut outs for eyes

adjust image sizes and dont render webcam output in browser

make the location of the pupils based on some state which is updated with information from the webcam
*/
