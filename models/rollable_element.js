class RollableElement {
  constructor(element) {
    this.element = $(element);

    this.element.addClass("rollableElement");
    this.element.click((e) => { this.click() });

    this.dice = [20];
    this.bonus = parseInt(this.element.html());
  }

  click() {
    calculator.roll(this.dice, this.bonus);
  }
}
