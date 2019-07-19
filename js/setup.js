'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var setup = document.querySelector('.setup');

  var shopItem = document.querySelector('.setup-artifacts-shop');
  var bagpack = document.querySelector('.setup-artifacts');
  var setupSimilar = document.querySelector('.setup-similar');
  var moveElement;
  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onDrop = function (evt) {
    if (evt.target.closest('.setup-artifacts-cell:empty')) {
      evt.target.closest('.setup-artifacts-cell:empty').appendChild(moveElement);
    }
  };

  var onDragStart = function (evt) {
    var element = evt.target.closest('img');
    if (element) {
      moveElement = element;
      evt.dataTransfer.setData('text/html', moveElement.textContent);
      bagpack.addEventListener('dragover', onDragOver);
      bagpack.addEventListener('drop', onDrop);
    }
  };

  shopItem.addEventListener('dragstart', onDragStart);

  var similarList = document.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizardCoat = setup.querySelector('.wizard-coat');
  var coatColorHidden = setup.querySelector('[name=\'coat-color\']');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var eyesColorHidden = setup.querySelector('[name=\'eyes-color\']');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var fireballHidden = setup.querySelector('[name=\'fireball-color\']');

  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var renderWizard = function (wizard) {
    var wizardItem = wizardTemplate.cloneNode(true);
    wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardItem.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardItem.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardItem;
  };

  wizardCoat.addEventListener('click', function () {
    var coatCurrentColor = COAT_COLORS[Math.floor(getRandomNumber(0, COAT_COLORS.length))];
    wizardCoat.style.fill = coatCurrentColor;
    coatColorHidden.value = coatCurrentColor;
  });

  wizardEyes.addEventListener('click', function () {
    var eyesCurrentColor = EYES_COLORS[Math.floor(getRandomNumber(0, EYES_COLORS.length))];
    wizardEyes.style.fill = eyesCurrentColor;
    eyesColorHidden.value = eyesCurrentColor;
  });

  fireball.addEventListener('click', function () {
    var fireballCurrentColor = FIREBALL_COLORS[Math.floor(getRandomNumber(0, FIREBALL_COLORS.length))];
    fireball.style['background-color'] = fireballCurrentColor;
    fireballHidden.value = fireballCurrentColor;
  });

  var form = setup.querySelector('.setup-wizard-form');

  var onDataLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards = wizards.slice(0, NUMBER_OF_WIZARDS);
    for (var i = 0; i < wizards.length; i += 1) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarList.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  var onErrorAppearance = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form),
        function () {
          window.dialog.closePopup();
        },
        onErrorAppearance);
    evt.preventDefault();
  });

  window.backend.load(onDataLoad, onErrorAppearance);
})();
