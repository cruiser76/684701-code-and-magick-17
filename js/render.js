'use strict';
(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardItem = wizardTemplate.cloneNode(true);
    wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardItem.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardItem.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardItem;
  };
  window.render = {
    renderWizard: renderWizard
  };
})();
