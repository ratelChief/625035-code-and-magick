'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верона', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  }
];

var getRandomValue = function (limit) {
  var result = limit[Math.floor(Math.random() * (limit.length))];

  return result;
};

var setWizardName = function (wizardNames, wizardLastnames) {
  var name = getRandomValue(wizardNames) + ' ' + getRandomValue(wizardLastnames);

  return name;
};

var setCoatColor = function (wizardCoatColors) {
  var coatColor = getRandomValue(wizardCoatColors);

  return coatColor;
};

var setEyesColor = function (wizardEyesColor) {
  var eyeColor = getRandomValue(wizardEyesColor);

  return eyeColor;
};

var initWizards = function () {
  for (var i = 0; i < wizards.length; i++) {
    wizards[i].name = setWizardName(WIZARD_NAMES, WIZARD_LASTNAMES);
    wizards[i].coatColor = setCoatColor(WIZARD_COATCOLORS);
    wizards[i].eyesColor = setEyesColor(WIZARD_EYESCOLOR);
  }
};

initWizards();

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
