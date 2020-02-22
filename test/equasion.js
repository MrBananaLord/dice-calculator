describe('Equasion', () => {
  describe('#result', () => {
    context('for valid equasion', () => {
      it('returns result', () => {
        var equasion = new Equasion();
        equasion.fromString('301 + 4 * (20 - 1)');

        chai.expect(equasion.result).to.equal(377);
      });

      it('returns result', () => {
        var equasion = new Equasion();
        equasion.fromString('3 * (2 + 5)');

        chai.expect(equasion.result).to.equal(21);
      });

      it('returns result', () => {
        var equasion = new Equasion();
        equasion.fromString('((((1*(2+3))-3)+4)*5)');

        chai.expect(equasion.result).to.equal(30);
      });

      it('returns result', () => {
        var equasion = new Equasion();
        equasion.fromString('(300+23)*(43-21)/(84+7)');

        chai.expect(equasion.result).to.equal(78.08791208791209);
      });

      it('returns result', () => {
        var equasion = new Equasion();
        equasion.fromString('(4+8)*(6-5)/((3-2)*(2+2))');

        chai.expect(equasion.result).to.equal(3);
      });

      it('returns result', () => {
        var equasion = new Equasion();
        equasion.fromString('( (10+20) + 30 ) * 20-8/4');

        chai.expect(equasion.result).to.equal(1198);
      });
    });

    context('for invalid equasion', () => {
      it('throws exception', () => {
        var equasion = new Equasion();
        equasion.fromString('- -');

        chai.expect(() => equasion.result).to.throw(Error, 'Invalid syntax!');
      });

      it('throws exception', () => {
        var equasion = new Equasion();
        equasion.fromString('-1');

        chai.expect(() => equasion.result).to.throw(Error, 'Invalid syntax!');
      });
    });
  });

  describe('#valid', () => {
    context('for invalid equasion', () => {
      it('is false', () => {
        var equasion = new Equasion();
        equasion.fromString('- -');

        chai.expect(equasion.valid).to.equal(false);
      });

      context('for valid equasion', () => {
        it('is false', () => {
          var equasion = new Equasion();
          equasion.fromString('3 * (2 + 5)');

          chai.expect(equasion.valid).to.equal(true);
        });
      });
    });
  });

  describe('#postfix', () => {
    context('for valid syntax', () => {
      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('301 + 4 * (20 - 1)');

        chai.expect(equasion.postfix).to.equal('301 4 20 1 - * +');
      });

      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('3 * (2 + 5)');

        chai.expect(equasion.postfix).to.equal('3 2 5 + *');
      });

      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('((((1*(2+3))-3)+4)*5)');

        chai.expect(equasion.postfix).to.equal('1 2 3 + * 3 - 4 + 5 *');
      });

      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('(300+23)*(43-21)/(84+7)');

        chai.expect(equasion.postfix).to.equal('300 23 + 43 21 - * 84 7 + /');
      });

      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('(4+8)*(6-5)/((3-2)*(2+2))');

        chai.expect(equasion.postfix).to.equal('4 8 + 6 5 - * 3 2 - 2 2 + * /');
      });

      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('( (10+20) + 30 ) * 20-8/4');

        chai.expect(equasion.postfix).to.equal('10 20 + 30 + 20 * 8 4 / -');
      });

      it('returns postfix', () => {
        var equasion = new Equasion();
        equasion.fromString('d5');

        chai.expect(equasion.postfix).to.equal('d5');
      });
    });

    context('for invalid syntax', () => {
      it('throws exception', () => {
        var equasion = new Equasion();
        equasion.fromString(')');

        chai.expect(() => equasion.postfix).to.throw(Error, 'Invalid syntax!');
      });

      it('throws exception', () => {
        var equasion = new Equasion();
        equasion.fromString('(');

        chai.expect(() => equasion.postfix).to.throw(Error, 'Invalid syntax!');
      });
    });
  });
});
