'use strict';
(function () {

  var URL_DOWNLOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';
  var WIZARDS_COUNT = 4;
  var STATUS_OK = 200;
  var SUCCESS_MESSAGE = 'Данные успешно отправлены';
  var MESSAGE_TIMEOUT = 3000;


  var setup = document.querySelector('.setup');
  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var appendElements = function (data, template, container) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(data[i], template));
    }
    container.appendChild(fragment);
  };

  var showStatusMessage = function (status, showTime) {
    var node = document.createElement('div');
    var messageColor = (status === STATUS_OK) ? 'green' : 'red';

    node.id = 'error';
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: ' + messageColor;
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = (status === STATUS_OK) ? SUCCESS_MESSAGE : status;

    var prevError = document.querySelector('#error');

    if (prevError) {
      window.util.removeElement(prevError);
    }

    document.body.insertAdjacentElement('afterbegin', node);

    if (showTime) {
      var timeout = setTimeout(function () {
        window.util.removeElement(node);
        clearTimeout(timeout);
      }, showTime);
    }
  };

  var onXhrLoad = function (wizards) {
    appendElements(wizards, similarWizardTemplate, similarListElement);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onXHRError = function (errorMessage) {
    showStatusMessage(errorMessage, MESSAGE_TIMEOUT);
  };

  window.backend.load({
    url: URL_DOWNLOAD,
    onLoad: onXhrLoad,
    onError: onXHRError
  });

  var form = setup.querySelector('.setup-wizard-form');

  var onFormSubmit = function (response, status) {
    setup.classList.add('hidden');
    showStatusMessage(status, MESSAGE_TIMEOUT);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save({
      url: URL_UPLOAD,
      data: new FormData(form),
      onLoad: onFormSubmit,
      onError: onXHRError
    });
    evt.preventDefault();
  });
})();

