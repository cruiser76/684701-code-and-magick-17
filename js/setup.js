'use strict';

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

var COATCOLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYESCOLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizards = [];

var setup = document.querySelector('.setup');

var similarList = document.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();

var setupSimilar = document.querySelector('.setup-similar');

var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

var createWizards = function (counter) {
  var wizardsList = [];
  for (var i = 0; i < counter; i += 1) {
    var wizard = {};
    wizard.name = NAMES[Math.floor(getRandomNumber(0, NAMES.length))] + ' ' + SURNAMES[Math.floor(getRandomNumber(0, SURNAMES.length))];
    wizard.coatcolor = COATCOLOR[Math.floor(getRandomNumber(0, COATCOLOR.length))];
    wizard.eyescolor = EYESCOLOR[Math.floor(getRandomNumber(0, EYESCOLOR.length))];
    wizardsList.push(wizard);
  }
  return wizardsList;
};

var renderWizard = function (wizard) {
  var wizardItem = wizardTemplate.cloneNode(true);
  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatcolor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyescolor;

  fragment.appendChild(wizardItem);
};

setup.classList.remove('hidden');

wizards = createWizards(4);

wizards.forEach(renderWizard);

similarList.appendChild(fragment);

setupSimilar.classList.remove('hidden');
