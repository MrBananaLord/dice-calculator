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
