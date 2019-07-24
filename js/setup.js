'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

  // var NAMES = [
  //   'Иван',
  //   'Хуан Себастьян',
  //   'Мария',
  //   'Кристоф',
  //   'Виктор',
  //   'Юлия',
  //   'Люпита',
  //   'Вашингтон'
  // ];

  // var SURNAMES = [
  //   'да Марья',
  //   'Верон',
  //   'Мирабелла',
  //   'Вальц',
  //   'Онопко',
  //   'Топольницкая',
  //   'Нионго',
  //   'Ирвинг',
  // ];

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
  var wizards;
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

  var wizardCoat = setup.querySelector('.wizard-coat');
  var coatColorHidden = setup.querySelector('[name=\'coat-color\']');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var eyesColorHidden = setup.querySelector('[name=\'eyes-color\']');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var fireballHidden = setup.querySelector('[name=\'fireball-color\']');

  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  // временно
  // var createWizards = function (counter) {
  //   var wizardsList = [];
  //   for (var i = 0; i < counter; i += 1) {
  //     var wizard = {};
  //     wizard.name = NAMES[Math.floor(getRandomNumber(0, NAMES.length))] + ' ' + SURNAMES[Math.floor(getRandomNumber(0, SURNAMES.length))];
  //     wizard.colorCoat = COAT_COLORS[Math.floor(getRandomNumber(0, COAT_COLORS.length))];
  //     wizard.colorEyes = EYES_COLORS[Math.floor(getRandomNumber(0, EYES_COLORS.length))];
  //     wizardsList.push(wizard);
  //   }
  //   return wizardsList;
  // };

  // временно
  // wizards = createWizards(NUMBER_OF_WIZARDS);

  var eyesColor = wizardEyes.style.fill;
  var coatColor = wizardCoat.style.fill;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var fragment = document.createDocumentFragment();
    wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }).slice(0, NUMBER_OF_WIZARDS).forEach(function (el) {
      fragment.appendChild(window.render.renderWizard(el));
    });

    similarList.innerHTML = '';
    similarList.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  wizardCoat.addEventListener('click', function () {
    var coatCurrentColor = COAT_COLORS[Math.floor(getRandomNumber(0, COAT_COLORS.length))];
    wizardCoat.style.fill = coatCurrentColor;
    coatColorHidden.value = coatCurrentColor;
    coatColor = coatCurrentColor;
    window.debounce(updateWizards);
  });


  wizardEyes.addEventListener('click', function () {
    var eyesCurrentColor = EYES_COLORS[Math.floor(getRandomNumber(0, EYES_COLORS.length))];
    wizardEyes.style.fill = eyesCurrentColor;
    eyesColorHidden.value = eyesCurrentColor;
    eyesColor = eyesCurrentColor;
    window.debounce(updateWizards);
  });

  fireball.addEventListener('click', function () {
    var fireballCurrentColor = FIREBALL_COLORS[Math.floor(getRandomNumber(0, FIREBALL_COLORS.length))];
    fireball.style['background-color'] = fireballCurrentColor;
    fireballHidden.value = fireballCurrentColor;
  });

  var form = setup.querySelector('.setup-wizard-form');

  var onDataLoad = function (wizardsList) {
    wizards = wizardsList;
    var fragment = document.createDocumentFragment();
    // wizards = wizards.slice(0, NUMBER_OF_WIZARDS);
    // for (var i = 0; i < wizards.length; i += 1) {
    //   fragment.appendChild(renderWizard(wizards[i]));
    // }
    similarList.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
    updateWizards();
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
  // updateWizards();
})();
