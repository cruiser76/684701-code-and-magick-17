'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NUMBER_OF_WIZARDS = 4

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

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
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameField = setup.querySelector('.setup-user-name');

var similarList = document.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();

var setupSimilar = document.querySelector('.setup-similar');

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

var createWizards = function (counter) {
  var wizardsList = [];
  for (var i = 0; i < counter; i += 1) {
    var wizard = {};
    wizard.name = NAMES[Math.floor(getRandomNumber(0, NAMES.length))] + ' ' + SURNAMES[Math.floor(getRandomNumber(0, SURNAMES.length))];
    wizard.coatColor = COAT_COLORS[Math.floor(getRandomNumber(0, COAT_COLORS.length))];
    wizard.eyesColor = EYES_COLORS[Math.floor(getRandomNumber(0, EYES_COLORS.length))];
    wizardsList.push(wizard);
  }
  return wizardsList;
};

var renderWizard = function (wizard) {
  var wizardItem = wizardTemplate.cloneNode(true);
  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  fragment.appendChild(wizardItem);
};

var wizards = createWizards(NUMBER_OF_WIZARDS);
wizards.forEach(renderWizard);
similarList.appendChild(fragment);

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(evt.target === userNameField)) {
    closePopup();
  }
};
var openPopup = function () {
  setup.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
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
