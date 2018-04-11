'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верона', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

var initWizards = function (wizardsCount) {
  for (var i = 0; i < wizardsCount; i++) {
    var wizard = {};
    wizard.name = getWizardName(WIZARD_NAMES, WIZARD_LASTNAMES);
    wizard.coatColor = getCoatColor(WIZARD_COATCOLORS);
    wizard.eyesColor = getEyesColor(WIZARD_EYESCOLOR);
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
