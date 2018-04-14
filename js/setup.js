'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верона', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var inputIsFocused = false;
var setupWizard = document.querySelector('.setup-wizard');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballColor = document.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (inputIsFocused) {
      evt.stopPropagation();
    } else {
      closePopup();
    }
  }
};

setupWizardEyes.addEventListener('click', changeWizardEyesColor);

var changeWizardEyesColor = function () {
  var newWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
  newWizardEyesColor.style.fill = getEyesColor(WIZARD_EYESCOLORS);
};

setupFireballColor.addEventListener('click', changeFireballColor);

var changeFireballColor = function () {
  setupFireballColor.style.backgroundColor = getFireballColor(FIREBALL_COLORS);
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

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

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [];

var getRandomValue = function (arr) {
  var result = arr[Math.floor(Math.random() * (arr.length))];

  return result;
};

var getWizardName = function (wizardNames, wizardLastnames) {
  var name = getRandomValue(wizardNames) + ' ' + getRandomValue(wizardLastnames);

  return name;
};

var getCoatColor = function (wizardCoatColors) {
  var coatColor = getRandomValue(wizardCoatColors);

  return coatColor;
};

var getEyesColor = function (wizardEyesColor) {
  var eyeColor = getRandomValue(wizardEyesColor);

  return eyeColor;
};

var getFireballColor = function (fireballColors) {
  var fireballColor = getRandomValue(fireballColors);

  return fireballColor;
};

var initWizards = function (wizardsCount) {
  for (var i = 0; i < wizardsCount; i++) {
    var wizard = {};
    wizard.name = getWizardName(WIZARD_NAMES, WIZARD_LASTNAMES);
    wizard.coatColor = getCoatColor(WIZARD_COATCOLORS);
    wizard.eyesColor = getEyesColor(WIZARD_EYESCOLORS);
    wizards.push(wizard);
  }
};

initWizards(4);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
