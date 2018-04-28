'use strict';
(function () {
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
    for (var i = 0; i < cells.length; i++) {
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
