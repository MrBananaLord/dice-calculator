INSERT(css.js)
INSERT(models/rollable_element.js)
INSERT(models/calculator.js)

var calculator = new Calculator();
var rollableElements = [
  ".character-ability-modifier",
  ".character-ability-save",
  ".skill-item-modifier"
];

$.map(rollableElements, function(selector) {
  new RollableElement(selector);
});
