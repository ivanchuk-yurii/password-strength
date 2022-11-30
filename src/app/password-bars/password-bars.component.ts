import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { reduce } from 'rxjs';


@Component({
  selector: 'app-password-bars',
  templateUrl: './password-bars.component.html',
  styleUrls: ['./password-bars.component.scss']
})
export class PasswordBarsComponent {
  @Input() public passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  private colors = ['red', 'yellow', 'green'];
  bar1: string;
  bar2: string;
  bar3: string;

  checkStrength(password) {
    let strength = 0;
    strength = password.length >= 8 ? strength += 10 : 0;

    const letters = /[a-zA-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const symbols = regex.test(password);

    const flags = [letters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    strength = (passedMatches === 1) ? strength += 1 : strength;
    strength = (passedMatches === 2) ? strength += 2 : strength;
    strength = (passedMatches === 3) ? strength += 3 : strength;

    return strength;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    const passStrength = this.checkStrength(password);
    this.setBarColors(4, '#ddd');
    if (password) {
      const c = this.getColor(passStrength);
      this.setBarColors(c.index, c.color);
    }

    passStrength === 13
      ? this.passwordStrength.emit(true)
      : this.passwordStrength.emit(false);
  }

  private getColor(strength) {
    let index = 0;
    switch (strength) {
      case 11:
        index = 0;
        break;
      case 12:
        index = 1;
        break;
      case 13:
        index = 2;
        break;
      default:
        index = 3;
    }

    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setBarColors(count, col) {
    for (let n = 1; n <= count; n++) {
      this['bar' + n] = col;
    }
  }
}
