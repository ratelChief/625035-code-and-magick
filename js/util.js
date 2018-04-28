'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomValue: function (arr) {
      var result = arr[Math.floor(Math.random() * (arr.length))];

      return result;
    },
    getWizardName: function (wizardNames, wizardLastnames) {
      var name = window.util.getRandomValue(wizardNames) + ' ' + window.util.getRandomValue(wizardLastnames);
      return name;
    },
    getCoatColor: function (wizardCoatColors) {
      var coatColor = window.util.getRandomValue(wizardCoatColors);

      return coatColor;
    },
    getEyesColor: function (wizardEyesColor) {
      var eyeColor = window.util.getRandomValue(wizardEyesColor);

      return eyeColor;
    },
    getFireballColor: function (fireballColors) {
      var fireballColor = window.util.getRandomValue(fireballColors);

      return fireballColor;
    }
  };
})();
