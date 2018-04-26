'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var inputIsFocused = false;
  var userNameInput = setup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (inputIsFocused) {
      evt.stopPropagation();
    } else {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var initialStateOfPopup = function () {
    setup.dataset.xCoord = setup.offsetLeft;
    setup.dataset.yCoord = setup.offsetTop;
  };

  userNameInput.addEventListener('focus', function () {
    inputIsFocused = true;
  });

  userNameInput.addEventListener('blur', function () {
    inputIsFocused = false;
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  setupOpen.addEventListener('click', function () {
    openPopup();
    initialStateOfPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
    initialStateOfPopup();
  });

  setupClose.addEventListener('click', function () {
    setup.style.left = setup.dataset.xCoord + 'px';
    setup.style.top = setup.dataset.yCoord + 'px';
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
