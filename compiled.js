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

class Token {
  constructor(value) {
    this.value = value;
  }

  static canBeInstantiatedFrom(value) {
    return true;
  }

  get type() {
    return 'token';
  }

  mergableWith(otherToken) {
    return false;
  }

  mergedValuesWith(otherToken) {
    return `${this.value}${otherToken.value}`;
  }

  isNumber() {
    return this.type === 'number';
  }

  isOperator() {
    return this.type === 'operator';
  }

  isBracket() {
    return this.type === 'bracket';
  }

  isRoll() {
    return this.type === 'roll';
  }

  isToken() {
    return this.type === 'token';
  }
}

class Operator extends Token {
  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 1;
  }

  precedences(otherOperator) {
    return this.precedenceScore > otherOperator.precedenceScore;
  }

  hasSamePrecedenceAs(otherOperator) {
    return this.precedenceScore == otherOperator.precedenceScore;
  }

  hasHigherPriorityThan(otherOperator) {
    return (
      this.precedences(otherOperator) ||
      (this.hasSamePrecedenceAs(otherOperator) && this.isLeftAssociative())
    )
  }

  isLeftAssociative() {
    return true;
  }
}

class Adder extends Operator {
  static canBeInstantiatedFrom(value) {
    return value === '+';
  }

  get precedenceScore() {
    return 1;
  }

  resolve(a, b) {
    return a + b;
  }
}

class Bracket extends Token {
  static get openingBrackets() {
    return ['(', '[', '{'];
  }

  static get closingBrackets() {
    return [')', ']', '}'];
  }

  static canBeInstantiatedFrom(value) {
    return (this.openingBrackets.concat(this.closingBrackets)).includes(value);
  }

  get type() {
    return 'bracket';
  }

  isOpening() {
    return this.constructor.openingBrackets.includes(this.value);
  }

  isClosing() {
    return this.constructor.closingBrackets.includes(this.value);
  }
}

class Divider extends Operator {
  static canBeInstantiatedFrom(value) {
    return ['/', '÷'].includes(value);
  }

  get precedenceScore() {
    return 2;
  }

  resolve(a, b) {
    return a / b;
  }
}

class Multiplier extends Operator {
  static canBeInstantiatedFrom(value) {
    return ['*', '×'].includes(value);
  }

  get precedenceScore() {
    return 2;
  }

  resolve(a, b) {
    return a * b;
  }
}

class Numeral extends Token {
  static canBeInstantiatedFrom(value) {
    return value.match(/^\d+$/) != null;
  }

  get type() {
    return 'number';
  }

  get toInt() {
    return parseInt(this.value);
  }

  mergableWith(otherToken) {
    return otherToken.isNumber() || otherToken.isRoll();
  }
}

class Roll extends Token {
  static canBeInstantiatedFrom(value) {
    return value.match(/^\d*d\d*$/) != null;
  }

  get type() {
    return 'roll';
  }

  get dieSize() {
    let result = this.value.match(/\d+$/);

    if (result) {
      return parseInt(result[0]);
    }
    else {
      return 0;
    }
  }

  get diceQuantity() {
    let result = this.value.match(/^\d+/);

    if (result) {
      return parseInt(result[0]);
    }
    else {
      return 1;
    }
  }

  resolve() {
    let result = 0;

    for (let rollIndex = 0; rollIndex < this.diceQuantity; rollIndex++) {
      result += this.rollOneDie();
    }

    return result;
  }

  rollOneDie() {
    let result = 0;

    if (this.dieSize > 0) {
      result = Math.floor(Math.random() * this.dieSize) + 1;
    }

    return result;
  }

  mergableWith(otherToken) {
    return otherToken.isNumber() || this.equalDieSizeWith(otherToken);
  }

  equalDieSizeWith(otherToken) {
    return otherToken.isRoll() && otherToken.dieSize == this.dieSize;
  }

  mergedValuesWith(otherToken) {
    if (this.equalDieSizeWith(otherToken)) {
      let diceQuantity = this.diceQuantity + otherToken.diceQuantity;

      return this.dieSize == 0 ? `${diceQuantity}d` : `${diceQuantity}d${this.dieSize}`;
    }
    else {
      return super.mergedValuesWith(otherToken);
    }
  }
}

class Subtractor extends Operator {
  static canBeInstantiatedFrom(value) {
    return value === '-';
  }

  get precedenceScore() {
    return 1;
  }

  resolve(a,b) {
    return a - b;
  }
}


class Tokenizer {
  constructor() {
    this.tokens = [];
  }

  static get tokens() {
    return([ Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Roll, Token ]);
  }

  buildToken(value) {
    let klass = this.constructor.tokens.find((klass) => klass.canBeInstantiatedFrom(value));

    return new klass(value);
  }

  get lastToken() {
    return this.tokens[this.tokens.length - 1];
  }

  addCharacter(character) {
    this.addToken(this.buildToken(character));
  }

  addToken(token) {
    if (token.isToken()) { return; }

    while (this.lastToken && this.lastToken.mergableWith(token)) {
      let lastToken = this.tokens.pop();

      token = this.buildToken(lastToken.mergedValuesWith(token));
    }

    this.tokens.push(token);
  }
}

class Converter {
  constructor(tokens) {
    this.tokens    = tokens;
    this.output    = [];
    this.operators = [];
  }

  get lastOperator() {
    return this.operators[this.operators.length - 1];
  }

  run() {
    this.tokens.forEach((token) => {
      if (token.isNumber() || token.isRoll()) {
        this.output.push(token);
      }
      else if (token.isOperator()) {
        while (this.lastOperator && !this.lastOperator.isBracket() && this.lastOperator.hasHigherPriorityThan(token)) {
          this.output.push(this.operators.pop());
        }

        this.operators.push(token);
      }
      else if (token.isBracket() && token.isOpening()) {
        this.operators.push(token);
      }
      else if (token.isBracket() && token.isClosing()) {
        while (this.lastOperator && !this.lastOperator.isBracket()) {
          this.output.push(this.operators.pop());
        }

        if (this.operators.length == 0) {
          throw new Error("Invalid syntax!");
        }

        this.operators.pop();
      }
    });

    while (this.operators.length) {
      if (this.lastOperator.isBracket()) {
        throw new Error("Invalid syntax!");
      }

      this.output.push(this.operators.pop());
    }

    return this.output;
  }
}

class Resolver {
  constructor(tokens) {
    this.tokens = tokens;
    this.stack  = [];
  }

  run() {
    this.tokens.forEach((token) => {
      if (token.isNumber()) {
        this.stack.push(token.toInt);
      }
      else if (token.isRoll()) {
        this.stack.push(token.resolve());
      }
      else if (token.isOperator()) {
        let lastValue = this.stack.pop();
        let secondToLastValue = this.stack.pop();

        this.stack.push(token.resolve(secondToLastValue, lastValue));
      }
    });

    return this.stack[0];
  }
}

class Equasion {
  constructor(string) {
    this.tokenizer = new Tokenizer();

    string.split("").forEach((character) => {
      this.add(character);
    });
  }

  get infixTokens() {
    return this.tokenizer.tokens;
  }

  get postfixTokens() {
    return new Converter(this.infixTokens).run();
  }

  get postfix() {
    return this.postfixTokens.map((t) => t.value).join(' ');
  }

  get result() {
    let result = new Resolver(this.postfixTokens).run();

    if (isNaN(result)) {
      throw new Error("Invalid syntax!");
    }

    return result;
  }

  add(character) {
    this.tokenizer.addCharacter(character);
  }
}


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
      target.toggle(e);
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
            <span class="value"></span>
          </div>
          <div class="result hidden">
            <div>=</div>
            <div class="values">
              <div class="regular">13</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="key orange">d4</div>
        <div class="key orange">d100</div>
        <div class="key orange">d?</div>
        <div class="key upcased red" data-action="revert">del</div>
        <div class="key upcased red" data-action="clear">clr</div>
      </div>
      <div class="row">
        <div class="key orange">d6</div>
        <div class="key">1</div>
        <div class="key">2</div>
        <div class="key">3</div>
        <div class="key blue">÷</div>
      </div>
      <div class="row">
        <div class="key orange">d8</div>
        <div class="key">4</div>
        <div class="key">5</div>
        <div class="key">6</div>
        <div class="key blue">×</div>
      </div>
      <div class="row">
        <div class="key orange">d10</div>
        <div class="key">7</div>
        <div class="key">8</div>
        <div class="key">9</div>
        <div class="key blue">-</div>
      </div>
      <div class="row">
        <div class="key orange">d12</div>
        <div class="key">0</div>
        <div class="key">&#40;</div>
        <div class="key">&#41;</div>
        <div class="key blue">+</div>
      </div>
      <div class="row">
        <div class="key orange">d20</div>
        <div class="key calculate upcased green" data-action="calculate">Roll</div>
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
#rollingStonesCalculator .key.red {
  color: #bc0f0e;
}
#rollingStonesCalculator .key.orange {
  color: #e68412;
}
#rollingStonesCalculator .key.blue {
  color: #127bc4;
}
#rollingStonesCalculator .key.calculate {
  width: 200px;
  background-color: #96bf6a;
  color: white;
}
#rollingStonesCalculator .upcased {
  text-transform: uppercase;
}
#rollingStonesCalculator .display {
  text-align: right;
  overflow: hidden;
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
#rollingStonesCalculator .display .result .values .regular {
  padding-left: 5px;
}
`);

    this.element = $("#rollingStonesCalculator");
    this.element.click(e => this.toggle(e));
    this.element.find(".box div").click(e => e.stopPropagation());
    this.element.find(".close").click(e => this.toggle(e));
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

    e.stopPropagation();
  }

  inputMode() {
    this.mode = "input";
    this.queue = [];
    this.resultElement.addClass("hidden");
    this.resultElement.find(".regular").text();
    this.updateEquasion()
  }

  push(value) {
    this.queue.push(value);
  }

  updateEquasion() {
    this.displayElement.text(this.equasion().infixTokens.map((t) => t.value).join(""));
  }

  equasion() {
    return new Equasion(this.queue.join(""));
  }

  calculate() {
    let result = this.equasion().result;

    this.updateResults(result);
    this.mode = "result";
  }

  clear() {
    this.inputMode();
  }

  revert() {
    if (this.mode == "input") {
      this.queue.pop();
    }
  }

  updateResults(roll) {
    this.resultElement.removeClass("hidden");
    this.resultElement.find(".regular").text(roll);
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

  toggle(e) {
    this.element.toggleClass("hidden");
    e.preventDefault();
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
