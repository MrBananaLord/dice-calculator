class Menu {
  constructor(calculator) {
    insertHTML(`INSERT(templates/menu.html)`);
    insertCSS(`INSERT(styles/menu.css)`);

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
