exports.formatRes = (restaurants) => {
  const resInfo = [];
  let temp = {};
  for (let i = 0; i < restaurants.length; i++) {
    temp.name = restaurants[i].restaurant.name;
    temp.address = restaurants[i].restaurant.location.address;
    temp.cuisines = restaurants[i].restaurant.cuisines;
    temp.highlights = restaurants[i].restaurant.highlights;
    temp.phone_numbers = restaurants[i].restaurant.phone_numbers;
    temp.menu_url = restaurants[i].restaurant.menu_url;
    temp.average_cost_for_two = restaurants[i].restaurant.average_cost_for_two;
    temp.timings = restaurants[i].restaurant.timings;
    resInfo.push(temp);
    temp = {};
  }
  return resInfo;
};

exports.shuffle = (restaurants) => {
  let restaurantArr = [...restaurants];
  let randomArr = [];
  let newNum;
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const shuffleArray = () => {
    let i = 19;
    while (randomArr.length < 16) {
      newNum = getRandomInt(0, i);
      randomArr.push(...restaurantArr.splice(newNum, 1));
      i--;
    }
    let fullArr = [...randomArr];
    let arr2 = randomArr.splice(0, 8);
    return { arr1: randomArr, arr2, fullArr };
  };
  return shuffleArray();
};
