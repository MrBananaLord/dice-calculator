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
