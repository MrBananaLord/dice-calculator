class Calculator {
  constructor() {
    insertHTML(`INSERT(templates/calculator.html)`);
    insertCSS(`INSERT(styles/calculator.css)`);

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
