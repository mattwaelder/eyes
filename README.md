# Creepy Body Tracking
A creepy application that tracks your movmements infront of a camera

<img src="https://github.com/mattwaelder/eyes/assets/74801942/58c31bf7-7660-4eb9-a09a-2de3cd0e62ed" width="800">

## Background
Continuing on my computer vision objesssion as of late, this is an idea I came up with while at work. Someone brought in a spooky painting and I thought to myself, I bet I could make an application where a painting follows you around the room... so I did! 

## Challenges
  Having worked with Tensorflow.js on my previous project allowed me to hit the ground running, but that doesn't mean there weren't at least a few challenges to overcome! Each projects is unique, and that means that each project has unique challenges, too. This time around I ran into two major challenges:
1. The Art:
    - I looked into art online, but settled quickly on using AI to generate the art. I used ImagineArt ![](https://www.imagine.art/) to generate the image of the creepy girl, and I used Freepik to get the frame and wallpaper ![](https://www.freepik.com/). After I had the assets I needed to do some modifications. The image I got from the AI generator was merely an image, and to make the eyes move I would need to split that image into several layers, one for the eyes, one for the pupils, and one for the rest of the girl. I feel like I managed this pretty well with my free software and admittedly meager photo editing skills, but my girlfriend seemed rather dismayed by the outcome, which means it's working!
3. The Eyes:
    - After having split the art into several layers, I needed to find a way to transform the location of the pupils within the frame of the eyes. I came up with a helper function which I'm pretty proud of. It's nothing that special but it should be rather robust thanks to everything being based on only a few variables.
   * Firstly the application finds the location of each person on the screen
   * then my helper function finds the center of mass of the most obvious person
   * This location is used to extrapolate a % for both the X and Y values of that point
   * That same % is applied to a maximum travel value set for the eye in each direction to yield a pixel translation
   * Finally the application takes that translation and updates a state which triggers the smooth movement of the eyes!

## How does the app work?
#For the machine learning and object detection
-Tensorflow.js, COCO-SSD
#For the display in browser
-React, Javascript

## See for Yourself!
Live site available at: https://tfeyes.netlify.app/
  
## Try it for yourself (video input required)
1. Clone repo
2. Install dependencies
3. "npm run start" in root dir
4. Allow your browser to access your webcam

## Author

Matthew Waelder

[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/mattwaelder/)](https://www.linkedin.com/in/mattwaelder/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/mattwaelder)](https://github.com/mattwaelder)

My Portfolio Website: https://mattwaelder.com

## Technology Used

**Front-end:** &emsp;&nbsp;&nbsp;

![Tensorflow.js](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Thanks for Reading!
If you've made it all the way down here I would like to thank you for reading this! Also, if you can think of a better method for making the counting more consistent please reach out (portfolio site listed above) :)
