import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserAPI } from '../api/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  signUpForm:FormGroup;
  user:any = {};
  address: any = [];
  password = new FormControl('', [Validators.required, CustomValidators.rangeLength([8, 24])]);
  password_confirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);

  constructor(private fb: FormBuilder, private userApi: UserAPI, private router: Router, private auth: AuthService, private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: this.password,
      password_confirmation: this.password_confirmation,
      addresses_attributes: this.fb.array([])
    });
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      city: [''],
      address: [''],
      zip: ['']
    })
  }

  addItem() {
    this.address = this.signUpForm.get('addresses_attributes') as FormArray;
    this.address.push(this.buildAddress());
  }

  removeAddress(index) {
    this.address.removeAt(index);
  }

  submit() {
    this.userApi.create({ user: this.signUpForm.value }).subscribe((data) => this.submitSuccessHandler(data), this.submitErrorHandler);
  }

  submitSuccessHandler = (data) => {
    this.auth.saveToken(data['token']);
    this.router.navigate(['/']);
    this.toastr.success('You have been successfuly Registrated!');
  }

  submitErrorHandler = (error) => {
    this.toastr.error(JSON.stringify(error.error.errors));
  }
}
