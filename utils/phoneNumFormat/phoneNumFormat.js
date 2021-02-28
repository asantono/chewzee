export const phoneNumFormat = (numString) => {
  if (numString) {
    let numFormat = numString.split(",");
    numFormat = numFormat[0];
    numFormat = numFormat.replace(/[^0-9 ]/g, "");
    numFormat = numFormat.split(" ");
    return numFormat.join("");
  } else return;
};

export const phoneNumDisplay = (numString) => {
  if (numString) {
    let numFormat = numString.split(",");
    return numFormat[0];
  }
};
