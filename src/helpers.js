export const lookAt = (objects, width, height) => {
  if (objects.length === 0 || !objects) return;

  //only want to look at people
  objects.filter((obj) => (obj.class = "person"));

  //would like to look at the most clear person on the screen
  let bestPerson = objects.reduce((max, el) =>
    el.score > max ? max === el.score : max === max
  );

  if (!bestPerson || typeof bestPerson !== "object") return;
  //bbox is an array like [x, y, width, height]

  //width of the object devided by two plus x, find the percent this value is of full frame width
  let translationX =
    ((bestPerson.bbox[0] + bestPerson.bbox[2] / 2) / width) * 100;

  let translationY =
    ((bestPerson.bbox[1] + bestPerson.bbox[3] / 2) / height) * 100;
  //camera is inverse, so i want the difference between 100% and the % of X translation. also round it, may need to account for out of bounds values later

  //doesnt seem to go above 80% or below 20% in practice
  let xVal = 100 - Math.round(translationX);
  let yVal = 100 - Math.round(translationY);

  //i need to take the percents and return position for the eyes
  //i dont want the eyes moving any more than + or - 10 px in either x,y direction
  //values above 50% are positive transformations, values below 50% are negative

  //if 50% i want no translation
  //if 10% i want -9 translation

  const maxTravelX = 20;
  const halfTravelX = maxTravelX / 2;

  const maxTravelY = 20;
  const halfTravelY = maxTravelY / 2;

  xVal = Math.round((xVal / 100) * maxTravelX);
  if (xVal < 0) xVal = 0;
  if (xVal > maxTravelX) xVal = maxTravelX;
  let movementX;

  yVal = Math.round((yVal / 100) * maxTravelY);
  if (yVal < 0) yVal = 0;
  if (yVal > maxTravelY) yVal = maxTravelY;
  let movementY;

  //if value is centered, dont move eyes
  if (xVal === halfTravelX) movementX = 0;
  if (yVal === halfTravelY) movementY = 0;
  //if value is past half, move positively
  if (xVal > halfTravelX) movementX = xVal - halfTravelX;
  if (yVal > halfTravelY) movementY = yVal - halfTravelY;
  //if value is short of half, move negatively
  if (yVal < halfTravelY) movementY = -(halfTravelY - yVal);
  if (xVal < halfTravelX) movementX = -(halfTravelX - xVal);

  movementY *= -1;
  let result = { movementX, movementY };
  return result;
};
