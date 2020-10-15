"use strict";

// на основе шаблона получаю фрагмент с элементами,
// которые затем буду вставляють в документ "в один прием"

(function() {

  // получаю шаблон
  const template = document.querySelector("#users-notice").content;
  // создам фрагмент, в который буду "складывать" сгенерированные элементы
  const fragment = document.createDocumentFragment();
  // создаю в фрагменте одельные div, в которые буду вставлять нужные элементы из шаблона
  getElementsForFragment(4);

  const elem1 = fragment.querySelector("#elem1"); // div для элементов .map__pin (userNotice)
  const elem2 = fragment.querySelector("#elem2"); // div для элементов .popup__photo
  const elem3 = fragment.querySelector("#elem3"); // div для элемента .map__card (Popup)
  const elem4 = fragment.querySelector("#elem4"); // div для элемента .error-message

  function getElementsForFragment(counter) {
    for (let i = 0; i < counter; i++) {
      const elem = document.createElement("div");
      elem.id = "elem" + (i + 1);
      fragment.append(elem);
    }
  }

  window.createFragment = {
    "elem1": elem1, // div для элементов .map__pin (userNotice)
    "elem2": elem2, // div для элементов .popup__photo
    "elem3": elem3, // div для элемента .map__card (Popup)
    "elem4": elem4, // div для элемента .errorMessage
    "template": template,
  };
})();

