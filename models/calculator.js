class Calculator {
  constructor() {
    insertHTML(`INSERT(templates/calculator.html)`);
    insertCSS(`INSERT(styles/calculator.css)`);

    this.element = $("#rollingStonesCalculator");
    this.element.click(e => this.toggle(e));
    this.element.find(".box div").click(e => e.stopPropagation());
    this.element.find(".close").click(e => this.toggle(e));
    this.element.find(".reroll").click(e => this.reroll(e));
    this.element.find(".key").click(e => this.keyClick(e));

    this.displayElement = this.element.find(".display .value");
    this.resultElement = this.element.find(".display .result");

    this.tokenizer = new Tokenizer();
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
    this.tokenizer.reset();
    this.resultElement.addClass("hidden");
    this.resultElement.find(".regular").text();
    this.updateEquasion()
  }

  push(value) {
    this.tokenizer.addCharacter(value);
  }

  updateEquasion() {
    this.displayElement.text(this.equasion().infixTokens.map((t) => t.value).join(""));
  }

  equasion() {
    return new Equasion(this.tokens);
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
      this.tokenizer.tokens.pop();
    }
  }

  updateResults(roll) {
    this.resultElement.removeClass("hidden");
    this.resultElement.find(".regular").text(roll);
  }

  toggle(e) {
    this.element.toggleClass("hidden");
    e.preventDefault();
  }
}
