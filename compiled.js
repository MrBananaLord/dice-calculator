javascript:(function(){
$("head").append(`
<style type="text/css">
#calculator {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
}
#calculator .box {
  background-color: Pink;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  box-shadow: 0px 0px 20px 2px rgb(0, 0, 0);
  border-radius: 2px;
  margin-top: 100px;
  background-color: #2a313a;
}
#calculator.hidden {
  display: none;
}
#calculator .header {
  text-align: left;
  font-size: 20px;
  font-family: "Roboto Condensed",Roboto,Helvetica,sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background-image: none;
  padding: 15px;
}
#calculator .body {
  border: none;
  border-radius: 0 0 1px 1px;
  background-color: white;
  padding: 15px;
}
#calculator .result {
  margin: 15px;
}
#calculator .reroll {
  border-radius: 2px;
  background-color: #96bf6b;
  color: #fff;
  border: 1px solid transparent;
  text-transform: uppercase;
  padding: 9px 15px;
  transition: all 50ms;
  cursor: pointer;
  display: block;
  margin-top: 15px;
  text-align: center;
}
#calculator .close {
  float: right;
  color: inherit;
  font-size: larger;
  padding: 2px;
  margin-top: -4px;
  cursor: pointer;
}
.rollableElement {
  color: #96bf6a;
  cursor: pointer;
}
.rollableElement:hover {
  color: #5a862b;
}
</style>
`);
class RollableElement {
  constructor(selector) {
    this.element = $(selector);

    this.element.addClass("rollableElement");
    this.element.click((e) => { this.click() });

    this.dice = [20];
    this.bonus = parseInt(this.element.find("[class*=value]").html());
  }

  click() {
    calculator.roll(this.dice, this.bonus);
  }
}
class Calculator {
  constructor() {
    $("body").append(`
<div id="calculator" class="hidden">
  <div class="box">
    <div class="header">
      <span class="headline">Roll result</span>
      <a href="#" class="close" role="button"><span>×</span></a>
    </div>
    <div class="body">
      <div class="result"></div>
      <a href="#" class="reroll" role="button"><span>Roll Again</span></a>
    </div>
  </div>
</div>
    `);

    this.element = $("#calculator");
    this.element.find(".close").click(e => this.hide(e));
    this.element.find(".reroll").click(e => this.reroll(e));
  }

  reroll(e) {
    e.preventDefault();
    this.roll(this.dice, this.bonus);
  }

  roll(dice, bonus) {
    this.dice = dice;
    this.bonus = bonus;

    var rolls1 = dice.map(d => Math.floor(Math.random() * d) + 1);
    var result1 = rolls1.reduce((a,b) => (a + b)) + bonus;
    var rolls2 = dice.map(d => Math.floor(Math.random() * d) + 1);
    var result2 = rolls2.reduce((a,b) => (a + b)) + bonus;

    this.show(`
      <p>Roll: ${dice.map(d => 'd' + d).join(' + ')} + (${bonus})</p>
      <p>Result 1: ${rolls1.join(' + ')} + (${bonus}) = <b>${result1}</b></p>
      <p>Result 2: ${rolls2.join(' + ')} + (${bonus}) = <b>${result2}</b></p>
    `);
  }

  show(html) {
    this.element.find(".result").html(html);
    this.element.removeClass("hidden");
  }

  hide(e) {
    e.preventDefault();
    this.element.addClass("hidden");
  }
}

var calculator = new Calculator();
var rollableElements = [
  ".character-ability-modifier",
  ".character-ability-save",
  ".skill-item-modifier",
  ".attack-item-callout-tohit"
];

$.map(rollableElements, function(selector) {
  new RollableElement(selector);
});
}());
