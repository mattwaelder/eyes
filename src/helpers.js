export const lookAt = (objects, width, height) => {
  //objects.bbox is an array like [x, y, width, height]
  if (objects.length === 0 || !objects) return;

  //filter only for people
  objects.filter((obj) => (obj.class = "person"));

  //of all detected people, get the most certain
  let bestPerson = objects.reduce((max, el) =>
    el.score > max ? max === el.score : max === max
  );
  if (!bestPerson || typeof bestPerson !== "object") return;

  //find % translation X & Y of center mass of person
  let translationX =
    ((bestPerson.bbox[0] + bestPerson.bbox[2] / 2) / width) * 100;
  let translationY =
    ((bestPerson.bbox[1] + bestPerson.bbox[3] / 2) / height) * 100;

  let xVal = 100 - Math.round(translationX);
  let yVal = 100 - Math.round(translationY);

  //values above 50% are positive transformations, values below 50% are negative
  //setting boundaries for how far the pupils can travel in each direction
  const maxTravelX = 30; //max was 20
  const halfTravelX = maxTravelX / 2;
  const maxTravelY = 30; //max was 20
  const halfTravelY = maxTravelY / 2;

  //get X & Y pixel translation values based on position of center mass of person
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

  //fix to mirror y movement
  movementY *= -1;

  //return pixel translation values for both dimensions
  let result = { movementX, movementY };
  return result;
};
