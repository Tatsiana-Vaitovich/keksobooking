"use strict";

// универсальные переменные и функции,
// которые могут использоваться в разных проектах
// utility - полезный

(function() {
  const KEY_CODE_ENTER = 13;
  const KEY_CODE_ESC = 27;

  function getRandomNumber(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    // для получения случайного числа от min до max округляю rand до меньшего целого
    const random = Math.floor(rand);
    return random;
  }

  function getRandomElement(arr) {
    // мы должны генерировать числа от 0 до arr.lenght - 1
    // случайное число от min до (max+1)
    const min = 0;
    const max = arr.length - 1;
    const random = window.util.getRandomNumber(min, max);
    return arr[random];
  }

  function shuffle(arr) {
    let currentIndex = arr.length;
    let temporaryValue; // временное значение
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

  // функция для вставки всех элементов из родительского блока:
  function insertChildrenAppend(parentName, whereInsert) {
    const counter = parentName.children.length;
    for (let i = 0; i < counter; i++) {
      const child = parentName.firstChild;
      whereInsert.append(child);
    }
  }

  function insertChildrenBefore(parentName, whereInsert) {
    const counter = parentName.children.length;
    for (let i = 0; i < counter; i++) {
      const child = parentName.firstChild;
      whereInsert.before(child);
    }
  }

  // функция для округления числа
  function roundNumber(number, to) {
    return Math.round((number) / to) * to;
  }

  // функция для очистки элемента
  function clear(where, elem) {
    const list = where.querySelector(elem);
    while (list.firstChild) {
      list.firstChild.remove();
    }
  }

  function addClass(elem, className) {
    elem.classList.add(className);
  }

  function removeClass(elem, className) {
    elem.classList.remove(className);
  }

  function addDisabled(elem) {
    elem.setAttribute("disabled", "");
  }

  function removeDisabled(elem) {
    elem.removeAttribute("disabled");
  }

  function removeElem(elem) {
    const parent = elem.parentNode;
    parent.removeChild(elem);
  }

  window.util = {
    "KEY_CODE_ENTER": KEY_CODE_ENTER,
    "KEY_CODE_ESC": KEY_CODE_ESC,
    "getRandomNumber": getRandomNumber,
    "getRandomElement": getRandomElement,
    "shuffle": shuffle,
    "insertChildrenAppend": insertChildrenAppend,
    "insertChildrenBefore": insertChildrenBefore,
    "roundNumber": roundNumber,
    "clear": clear,
    "addClass": addClass,
    "removeClass": removeClass,
    "addDisabled": addDisabled,
    "removeDisabled": removeDisabled,
    "removeElem": removeElem,
  };
})();
