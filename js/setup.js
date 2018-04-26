'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верона', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballColor = document.querySelector('.setup-fireball-wrap');
  var inputValueWizardEyes = document.querySelector('.eyes-color');
  var inputValueFireball = document.querySelector('.fireball-color');

  var changeWizardEyesColor = function () {
    var newWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
    var eyeColor = getEyesColor(WIZARD_EYESCOLORS);
    newWizardEyesColor.style.fill = eyeColor;
    inputValueWizardEyes.value = eyeColor;
  };

  setupWizardEyes.addEventListener('click', changeWizardEyesColor);

  var changeFireballColor = function () {
    var fireballColor = getFireballColor(FIREBALL_COLORS);
    setupFireballColor.style.backgroundColor = fireballColor;
    inputValueFireball.value = fireballColor;
  };

  setupFireballColor.addEventListener('click', changeFireballColor);

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
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.effectAllowed = 'copy';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsCells = document.querySelectorAll('.setup-artifacts-cell');

  var enableDragAndDrop = function (cells) {
    for (i = 0; i < cells.length; i++) {
      var element = cells[i];
      if (element.firstChild && !element.draggble === true) {
        element.firstChild.draggable = true;
      }
    }
  };

  enableDragAndDrop(artifactsCells);

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.dataTransfer.dropEffect = 'copy';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.currentTarget.style.outline = '2px dashed red';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  artifactsElement.addEventListener('dragend', function (evt) {
    evt.currentTarget.style.outline = '';
    evt.preventDefault();
  });
})();
