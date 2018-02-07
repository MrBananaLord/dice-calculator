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

var calculator = "asd";
var menu = new Menu(calculator);
