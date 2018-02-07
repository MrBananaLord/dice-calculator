class Calculator {
  constructor() {
    insertHTML(`INSERT(templates/calculator.html)`);
    insertCSS(`INSERT(styles/calculator.css)`);

    this.element = $("#rollingStonesCalculator");
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
