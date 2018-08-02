import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from '../api/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  signUpForm:FormGroup;
  user:any = {};
  password = new FormControl('', [Validators.required, CustomValidators.rangeLength([8, 24])]);
  password_confirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);

  constructor(public fb: FormBuilder, public userApi: UserAPI, public router: Router, public auth: AuthService) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: this.password,
      password_confirmation: this.password_confirmation
    });
  }

  submit() {
    this.userApi.signUp({ user: this.signUpForm.value }).subscribe((data) => {
      this.auth.saveToken(data['token']);
      this.router.navigate(['/']);
    })
  }
}
