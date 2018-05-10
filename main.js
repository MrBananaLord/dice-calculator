insertCSS = function(styles) {
  $("head").append(`
<style type="text/css">
${styles}
</style>
  `);
};
insertHTML = function(html) {
  $("body").append(html);
};

insertCSS(`INSERT(styles/shared.css)`);

INSERT(models/tokens/token.js)
INSERT(models/tokens/operator.js)
INSERT(models/tokens/adder.js)
INSERT(models/tokens/bracket.js)
INSERT(models/tokens/divider.js)
INSERT(models/tokens/multiplier.js)
INSERT(models/tokens/numeral.js)
INSERT(models/tokens/roll.js)
INSERT(models/tokens/subtractor.js)

INSERT(models/tokenizer.js)
INSERT(models/converter.js)
INSERT(models/resolver.js)
INSERT(models/equasion.js)

INSERT(models/menu.js)
INSERT(models/calculator.js)
INSERT(models/rollable_element.js)

var calculator = new Calculator();
var menu = new Menu(calculator);

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
