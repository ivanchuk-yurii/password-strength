import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isShowPassword = false;
  password = new FormControl('', Validators.required);
  passwordIsValid = false;

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  passwordValid(event) {
    this.passwordIsValid = event;
  }
}
