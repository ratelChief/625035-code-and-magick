'use strict';
(function () {
  var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballColor = document.querySelector('.setup-fireball-wrap');
  var inputValueWizardEyes = document.querySelector('.eyes-color');
  var inputValueFireball = document.querySelector('.fireball-color');

  var changeWizardEyesColor = function () {
    var newWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
    var eyeColor = window.util.getEyesColor(WIZARD_EYESCOLORS);
    newWizardEyesColor.style.fill = eyeColor;
    inputValueWizardEyes.value = eyeColor;
  };

  setupWizardEyes.addEventListener('click', changeWizardEyesColor);

  var changeFireballColor = function () {
    var fireballColor = window.util.getFireballColor(FIREBALL_COLORS);
    setupFireballColor.style.backgroundColor = fireballColor;
    inputValueFireball.value = fireballColor;
  };

  setupFireballColor.addEventListener('click', changeFireballColor);
})();
