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
  address: any[] = [];

  constructor(public userApi: UserAPI,
              public fb: FormBuilder,
              public router: Router,
              public auth: AuthService,
              private toastr: ToastrService) { }

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
    this.user.addresses.forEach((address) => {
      this.addAddress(address.city, address.address, address.zip, address.id);
    });
  }

  addAddress(city = '', address = '' , zip = '', id = '') {
    this.address = this.userEditForm.get('addresses_attributes') as FormArray;
    this.address.push(this.buildAddress(city, address, zip, id));
  }

  buildAddress(city, address, zip, id): FormGroup {
    return this.fb.group({
      city: [city, [Validators.required]],
      address: [address, [Validators.required]],
      zip: [zip, [Validators.required, CustomValidators.lt(5)]],
      id: [id]
    })
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
