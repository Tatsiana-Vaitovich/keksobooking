"use strict";

(function() {

  // переменные и функции, используемые при работе с формами
  const price = document.querySelector("#price");
  const type = document.querySelector("#type");
  const time = document.querySelector(".ad-form__element--time");
  const timein = document.querySelector("#timein");
  const timeout = document.querySelector("#timeout");
  const roomNumber = document.querySelector("#room_number");
  const capacity = document.querySelector("#capacity");

  function enebleForm(formName) {
    const formElements = Array.from(formName.elements);
    formElements.forEach(function(elem) {
      if (elem.closest("input") || elem.closest("select")) {
        window.util.removeDisabled(elem);
      }
    });
  }

  // type.addEventListener("change", function() {
  //   const value = this.value;
  //   switch (value) {
  //     case "bungalo":
  //       getMinForFieldPrice("bungalo");
  //       break;
  //     case "flat":
  //       getMinForFieldPrice("flat");
  //       break;
  //     case "house":
  //       getMinForFieldPrice("house");
  //       break;
  //     case "palace":
  //       getMinForFieldPrice("palace");
  //   }
  // });

  // упрощаю предыдущую функцию и использую перечисление:
  type.addEventListener("change", function() {
    const value = this.value;
    getMinForFieldPrice(value);
  });

  function getMinForFieldPrice(type) {
    price.setAttribute("min", window.data.minPriceArr[type]);

    const valueMin = price.getAttribute("min");

    price.setAttribute("placeholder", valueMin);
  }

  time.addEventListener("change", function(changeEvt) {
    const elem = changeEvt.target;
    if (elem === timein) {
      timeout.value = elem.value;
    } else if (elem === timeout) {
      timein.value = elem.value;
    }
  });

  window.dom.form.addEventListener("change", newValue);

  function newValue(changeEvt) {
    changeEvt.preventDefault();
    const arr = [roomNumber, capacity];
    const targetElem = changeEvt.target;
    if (arr.includes(targetElem)) {
      const topElem = targetElem;
      const slaveElem = arr.find((item) => (item !== topElem));
      const slavesArr = getArrFromCollectionOptions(slaveElem);
      const topsArr = getArrFromCollectionOptions(topElem);
      slavesArr.forEach(function(elem) {
        window.util.removeDisabled(elem);
      });
      topsArr.forEach(function(elem) {
        window.util.removeDisabled(elem);
      });
      if (topElem === roomNumber) {
        newValueForCapacity();
      } else {
        newValueForRoomNumber();
      }
    }
  }

  function newValueForCapacity() {
    const value = roomNumber.value;
    const capacitysArr = getArrFromCollectionOptions(capacity);
    switch (value) {
      case "1":
        capacitysArr.forEach(function(elem) {
          if (elem.value !== "1") {
            window.util.addDisabled(elem);
          }
        });
        capacity.selectedIndex = 2;
        break;
      case "2":
        capacitysArr.forEach(function(elem) {
          if ((elem.value !== "1") && (elem.value !== "2")) {
            window.util.addDisabled(elem);
          }
        });
        capacity.selectedIndex = 1;
        break;
      case "3":
        capacitysArr.forEach(function(elem) {
          if (elem.value === "0") {
            window.util.addDisabled(elem);
          }
        });
        capacity.selectedIndex = 0;
        break;
      case "100":
        capacitysArr.forEach(function(elem) {
          if (elem.value !== "0") {
            window.util.addDisabled(elem);
          }
        });
        capacity.selectedIndex = 3;
    }
  }

  function newValueForRoomNumber() {
    const value = capacity.value;
    const roomNumdersArr = getArrFromCollectionOptions(roomNumber);
    switch (value) {
      case "3":
        roomNumdersArr.forEach(function(elem) {
          if (elem.value !== "3") {
            window.util.addDisabled(elem);
          }
        });
        roomNumber.selectedIndex = 2;
        break;
      case "2":
        roomNumdersArr.forEach(function(elem) {
          if ((elem.value !== "2") && (elem.value !== "3")) {
            window.util.addDisabled(elem);
          }
        });
        roomNumber.selectedIndex = 1;
        break;
      case "1":
        roomNumdersArr.forEach(function(elem) {
          if (elem.value === "100") {
            window.util.addDisabled(elem);
          }
        });
        roomNumber.selectedIndex = 0;
        break;
      case "0":
        roomNumdersArr.forEach(function(elem) {
          if (elem.value !== "100") {
            window.util.addDisabled(elem);
          }
        });
        roomNumber.selectedIndex = 3;
    }
  }

  function getArrFromCollectionOptions(elem) {
    const collection = elem.options;
    return Array.from(collection);
  }

  // FormData - встроенное API, которое превращает данные формы в объект,
  // пригодный для отправки на сервер
  // создается при помощи конструктора объектов
  // в качестве параметра передаем форму
  window.dom.form.addEventListener("submit", function(submitEvt) {
    submitEvt.preventDefault();
    const formData = new FormData(window.dom.form);
    window.backend.backendXHR.upload(formData, window.backend.handleFormUploadingSuccess, window.backend.handleFormUploadingErrors);
  });

  function hiddenMessage() {
    window.util.addClass(window.dom.success, "hidden");
  }

  window.form = {
    "enebleForm": enebleForm,
    "hiddenMessage": hiddenMessage,
  };
})();
