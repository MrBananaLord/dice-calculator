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

class Calculator {
  constructor() {
    insertHTML(`
<div id="rollingStonesCalculator" class="rollingStones hidden">
  <div class="box">
    <div class="header">
      <span class="headline">Roll calculator</span>
      <a href="#" class="close" role="key"><span>×</span></a>
    </div>
    <div class="body">
      <div class="row display">
        <div class="scrollable">
          <div class="equasion">
            <span class="value">alkjsdbasjhd balkjsdba sjhdbalkjsdbasjhdba lkjsdbasjhdbalkjsdbasjhdb</span>
          </div>
          <div class="result hidden">
            <div>=</div>
            <div class="values">
              <div class="regular">13</div>
              <div class="special">
                <div class="advantage">13</div>
                <div class="disadvantage">10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="key">d4</div>
        <div class="key">d&#37;</div>
        <div class="key">d?</div>
        <div class="key upcased" data-action="revert">del</div>
        <div class="key upcased" data-action="clear">clr</div>
      </div>
      <div class="row">
        <div class="key">d6</div>
        <div class="key">1</div>
        <div class="key">2</div>
        <div class="key">3</div>
        <div class="key">÷</div>
      </div>
      <div class="row">
        <div class="key">d8</div>
        <div class="key">4</div>
        <div class="key">5</div>
        <div class="key">6</div>
        <div class="key">×</div>
      </div>
      <div class="row">
        <div class="key">d10</div>
        <div class="key">7</div>
        <div class="key">8</div>
        <div class="key">9</div>
        <div class="key">-</div>
      </div>
      <div class="row">
        <div class="key">d12</div>
        <div class="key">0</div>
        <div class="key">&#40;</div>
        <div class="key">&#41;</div>
        <div class="key">+</div>
      </div>
      <div class="row">
        <div class="key">d20</div>
        <div class="key calculate upcased" data-action="calculate">Roll</div>
      </div>
    </div>
  </div>
</div>
`);
    insertCSS(`
#rollingStonesCalculator {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
}
#rollingStonesCalculator .box {
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  box-shadow: 0px 0px 20px 2px rgb(0, 0, 0);
  border-radius: 2px;
  margin-top: 100px;
  background-color: #2a313a;
}
#rollingStonesCalculator .header {
  text-align: left;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  padding: 15px;
}
#rollingStonesCalculator .body {
  border: none;
  border-radius: 0 0 1px 1px;
  background-color: white;
}
#rollingStonesCalculator .reroll {
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
#rollingStonesCalculator .close {
  float: right;
  color: inherit;
  font-size: larger;
  margin-top: -4px;
  cursor: pointer;
}
#rollingStonesCalculator .row {
  height: 50px;
  width: 250px;
  text-align: center;
  line-height: 50px;
}
#rollingStonesCalculator .display {
  background-color: #fff;
}
#rollingStonesCalculator .key {
  float: left;
  width: 50px;
  height: 50px;
  background-color: #f1f1f1;
  cursor: pointer;
}
#rollingStonesCalculator .key.calculate {
  width: 200px;
  background-color: #96bf6a;
}
#rollingStonesCalculator .upcased {
  text-transform: uppercase;
}
#rollingStonesCalculator .display {
  text-align: right;
  overflow: scroll;
  width: 250px;
  direction: rtl;
  position: relative;
}
#rollingStonesCalculator .display div {
  direction: ltr;
}
#rollingStonesCalculator .display .scrollable {
  width: max-content;
  height: 50px;
  white-space: nowrap;
  overflow: unset;
}
#rollingStonesCalculator .display .equasion {
  padding: 0 5px 0 10px;
  float: left;
  font-weight: normal;
}
#rollingStonesCalculator .display .result {
  float: right;
  padding-right: 10px;
  height: 50px;
}
#rollingStonesCalculator .display .result div {
  float: left;
  text-align: center;
}
#rollingStonesCalculator .display .result .values .advantage {
  color: #96bf6a;
  height: 24px;
  border-bottom: 1px solid #d6d6d6;
  float: none;
}
#rollingStonesCalculator .display .result .values .disadvantage {
  color: #d23f40;
  height: 24px;
  border-top: 1px solid #d6d6d6;
  float: none;
}
#rollingStonesCalculator .display .result .values .regular {
  padding-left: 5px;
}
#rollingStonesCalculator .display .result .values .special {
  line-height: 25px;
  padding-left: 5px;
}
`);

    this.element = $("#rollingStonesCalculator");
    this.element.find(".close").click(e => this.hide(e));
    this.element.find(".reroll").click(e => this.reroll(e));
    this.element.find(".key").click(e => this.keyClick(e));

    this.displayElement = this.element.find(".display .value");
    this.resultElement = this.element.find(".display .result");

    this.queue = [];
    this.mode  = "input";
  }

  keyClick(e) {
    let target = $(e.target);
    let action = target.data("action");

    if (action == null) {
      if (this.mode == "result") {
        this.inputMode();
      }

      this.push(target.html());
    } else {
      this[action]();
    }

    this.updateEquasion();
  }

  inputMode() {
    this.mode = "input";
    this.queue = [];
    this.resultElement.addClass("hidden");
  }

  push(value) {
    this.queue.push(value);
  }

  updateEquasion() {
    this.displayElement.text(this.equasion());
  }

  equasion() {
    return this.queue.join(" ");
  }

  calculate() {
    let firstRoll = this.resolveEquasion();
    let secondRoll = this.resolveEquasion();

    this.updateResults(firstRoll, secondRoll);
    this.mode = "result";
  }

  resolveEquasion() {
    return Math.floor(Math.random() * 20) + 1;
  }

  updateResults(firstRoll, secondRoll) {
    this.resultElement.removeClass("hidden");
    this.resultElement.find(".regular").text(firstRoll);
    this.resultElement.find(".advantage").text(Math.max(firstRoll, secondRoll));
    this.resultElement.find(".disadvantage").text(Math.min(firstRoll, secondRoll));
  }

  reroll(e) {
    e.preventDefault();
    this.roll(this.dice, this.bonus);
  }

  roll(dice, bonus) {
    this.element.removeClass("hidden");
    this.queue = [dice, "+", bonus];
    this.updateEquasion();
    this.calculate();
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

class RollableElement {
  constructor(selector) {
    insertCSS(`

.rollableElement {
  color: #96bf6a;
  cursor: pointer;
}
.rollableElement:hover {
  color: #5a862b;
}
`);

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
