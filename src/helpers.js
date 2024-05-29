export const lookAt = (objects, width, height) => {
  if (objects.length === 0 || !objects) return;

  let bestPerson = objects.reduce((max, el) =>
    el.score > max ? max === el.score : max === max
  );

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
  let pos = { xVal, yVal };

  return pos;
};
