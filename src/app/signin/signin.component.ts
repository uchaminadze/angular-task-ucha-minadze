import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private router: Router) {}

  username: string = '';
  isUsernameInputFocused: boolean = false;

  password: string = '';
  isPasswordInputFocused: boolean = false;

  isFormIncorrect: boolean = false;

  onChangeUsername(event: any) {
    this.username = event.target.value;
  }

  onUsernameInputFocus() {
    this.isUsernameInputFocused = true;
  }

  onChangePassword(event: any) {
    this.password = event.target.value;
  }

  onPasswordInputFocus() {
    this.isPasswordInputFocused = true;
  }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/home']);
      this.isFormIncorrect = false;
    }
    this.isFormIncorrect = true;
    return false;
  }
}
