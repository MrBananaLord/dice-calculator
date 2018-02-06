insertCSS = function(styles) {
  $("head").append(`
<style type="text/css">
${styles}
</style>
  `);
}
insertHTML = function(html) {
  $("body").append(html);
}

INSERT(models/menu.js)
INSERT(models/calculator.js)

var calculator = new Menu();
