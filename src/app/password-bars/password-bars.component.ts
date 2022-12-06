import { Component, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

enum Strength {
  eightSymbols = 1,
  easy = 2,
  medium = 3,
  strong = 4
}

@Component({
  selector: 'app-password-bars',
  templateUrl: './password-bars.component.html',
  styleUrls: ['./password-bars.component.scss']
})
export class PasswordBarsComponent {
  @Input() passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  colors = ['red', 'yellow', 'green'];
  barsColors = [];

  checkStrength(password: string): Strength {
    let strength = password.length >= 8 ? Strength.eightSymbols : 0;

    const letters = /[a-zA-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = /[$-/:-?{-~!"^_@`\[\]]/g.test(password);

    const flags = [letters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      if (flag) {
        passedMatches++;
      }
    }

    strength += passedMatches;

    return strength;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    const passStrength = this.checkStrength(password);
    this.barsColors = [];

    if (password.length >= 8) {
      const c = this.getColor(passStrength);
      this.setBarColors(c.index, c.color);
    }

    if (password && password.length < 8) {
      this.setBarColors(3, 'red')
    }

    this.passwordStrength.emit(passStrength === Strength.strong);
  }

  private getColor(strength: Strength) {
    let index = 0;
    switch (strength) {
      case Strength.easy:
        index = 0;
        break;
      case Strength.medium:
        index = 1;
        break;
      case Strength.strong:
        index = 2;
        break;
      default:
        index;
    }

    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setBarColors(count, col) {
    for (let n = 0; n < count; n++) {
      this.barsColors.push(col);
    }
  }
}
