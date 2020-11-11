"use strict";

(function() {

  function getFeatures(arr) {
    const initialArr = [];
    for (let i = 0; i < arr.length; i++) {
      initialArr[i] = arr[i];
    }
    const newArr = [];
    const elementsQuantity = window.util.getRandomNumber(0, initialArr.length);
    for (let i = 0; i < elementsQuantity; i++) {
      const element = window.util.getRandomElement(initialArr);
      const index = initialArr.indexOf(element);
      initialArr.splice(index, 1);
      newArr[i] = element;
    }
    return newArr;
  }

  window.getMyMock.getFeatures = getFeatures;
})();
