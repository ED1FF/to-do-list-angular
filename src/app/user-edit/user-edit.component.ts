import { Component, OnInit } from '@angular/core';
import { UserAPI } from "../api/user";
import { AuthService } from "../auth/auth.service";
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  user:any = {};
  userEditForm:FormGroup;
  address: any = [];

  constructor(private userApi: UserAPI,
              private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastrService,
              public router: Router,) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userApi.get().subscribe((data) => {
      this.user = data;
      this.createForm();
    });
  }

  createForm() {
    this.userEditForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      addresses_attributes: this.fb.array([])
    });
    this.addCreatedAddresses();
  }

  addCreatedAddresses() {
    this.user.addresses.forEach(this.addAddress);
  }

  addAddress = (address = {}) => {
    this.address = this.userEditForm.get('addresses_attributes') as FormArray;
    this.address.push(this.buildAddress(address));
  }

  buildAddress(data = <any>{}): FormGroup {
    return this.fb.group({
      city: [data.city, [Validators.required]],
      address: [data.address, [Validators.required]],
      zip: [data.zip, [Validators.required, CustomValidators.lt(5)]],
      id: [data.id]
    });
  }

  removeAddress(index) {
    let address = this.address.at(index).value;
    address['_destroy'] = true;
  }

  submit() {
    this.userApi.update({ user: this.userEditForm.value }).subscribe(this.submitSuccessHandler, this.submitErrorHandler);
  }

  submitSuccessHandler = (data) => {
    this.toastr.success('Your page have been successfuly Updated!');
  }

  submitErrorHandler = (error) => {
    this.toastr.error(JSON.stringify(error.error.errors));
  }
}
