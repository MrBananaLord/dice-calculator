INSERT(css.js)
INSERT(models/rollable_element.js)
INSERT(models/calculator.js)

var calculator = new Calculator(); // global because I am lazy
var rollableElements = $(".character-ability-stat-value");

$.map(rollableElements, function(element) {
  new RollableElement(element);
});
