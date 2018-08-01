import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from '../api/user'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  user:any = {};

  constructor(public fb: FormBuilder, public userApi: UserAPI) {
    this.createForm()
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
      console.log(data)
      // this.toastr.success('Task was created!');
    })
  }
}
