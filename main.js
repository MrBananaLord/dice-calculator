INSERT(css.js)
INSERT(models/rollable_element.js)
INSERT(models/calculator.js)

var calculator = new Calculator();
var rollableElements = [
  ".character-ability-modifier",
  ".character-ability-save",
  ".skill-item-modifier",
  ".attack-item-callout-tohit",
  ".attack-item-callout-dmg"
];

$.map(rollableElements, function(selector) {
  new RollableElement(selector);
});
