import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from '../api/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  user:any = {};

  constructor(public fb: FormBuilder, public userApi: UserAPI, public router: Router, public auth: AuthService) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.userApi.signUp({ user: this.signUpForm.value }).subscribe((data) => {
      this.auth.saveToken(data['token'])
      this.router.navigateByUrl('')
    })
  }
}
