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
    let roll = this.resolveEquasion();

    this.updateResults(roll);
    this.mode = "result";
  }

  resolveEquasion() {
    return new Equasion(this.equasion()).result;
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

  show(html) {
    this.element.find(".result").html(html);
    this.element.removeClass("hidden");
  }

  hide(e) {
    e.preventDefault();
    this.element.addClass("hidden");
  }
}
