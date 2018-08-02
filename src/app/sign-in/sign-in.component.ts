import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from '../api/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  signInForm:FormGroup;
  user:any = {};

  constructor(public fb: FormBuilder, public userApi: UserAPI, public router: Router, public auth: AuthService) {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.userApi.signIn(this.signInForm.value).subscribe((data) => {
      this.auth.saveToken(data['token']);
      this.router.navigateByUrl('');
    })
  }
}
