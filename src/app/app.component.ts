import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isShowPassword = true;
  passwordForm: FormGroup;
  passwordIsValid = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
}

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  passwordValid(event) {
    this.passwordIsValid = event;
  }

  onSubmit() {
    console.log(this.passwordForm.value);
  }
}
