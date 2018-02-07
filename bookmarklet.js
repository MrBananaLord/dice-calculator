javascript:(function(){
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

insertCSS(`
.rollingStones {
  font-family: "Roboto Condensed",Roboto,Helvetica,sans-serif;
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  color: inherit;
}
.rollingStones .hidden, .rollingStones.hidden {
  display: none !important;
}
.rollingStones a {
  text-decoration: none;
  color: inherit;
}
`);

class Menu {
  constructor(calculator) {
    insertHTML(`
<div id="rollingStonesMenu" class="rollingStones">
  <a href="#" data-target="calculator">Calc</a>
</div>
`);
    insertCSS(`
#rollingStonesMenu {
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #d4d0ce;
  border-left: none;
  border-radius: 2px;
  position: fixed;
  top: 100px;
  left: 0;
  height: 50px;
  line-height: 50px;
}
#rollingStonesMenu a {
  display: inline-block;
  text-transform: uppercase;
  margin: 0 5px;
}
`);

    this.calculator = calculator;

    this.element = $("#rollingStonesMenu");
    this.element.find("a").click(e => this.itemClick(e));
  }

  itemClick(e) {
    e.preventDefault();

    let target = this[$(e.target).data("target")];
    if (target != null) {
      target.show();
    }
  }
}


var calculator = "asd";
var menu = new Menu(calculator);
}());