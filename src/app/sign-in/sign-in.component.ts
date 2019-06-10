import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from '../api/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { SessionAPI } from '../api/session';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  signInForm:FormGroup;
  budgeForm:FormGroup;
  user:any = {};

  constructor(private fb: FormBuilder, private userApi: UserAPI, private router: Router, private toastr: ToastrService, private sessionApi: SessionAPI, public auth: AuthService, public electronService: ElectronService) {
    this.createForm();
  }

  createForm() {
    // this.signInForm = this.fb.group({
    //   email: ['', [Validators.required, CustomValidators.email]],
    //   password: ['', [Validators.required, CustomValidators.rangeLength([8, 24])]]
    // });
    this.budgeForm = this.fb.group({
      value: ['']
    });
  }

  submit() {
    this.electronService.ipcRenderer.sendSync('update-badge', this.budgeForm.value.value);
    // this.sessionApi.create(this.signInForm.value).subscribe((data) => this.submitSuccessHandler(data), this.submitErrorHandler)
  }

  removeBadge() {
    this.electronService.ipcRenderer.sendSync('update-badge', null);
  }

  submitSuccessHandler = (data) => {
    this.auth.saveToken(data['token']);
    this.router.navigate(['/']);
    this.toastr.success('You have been successfuly Signed in!');
  }

  submitErrorHandler = (error) => {
    this.toastr.error(error.error['message']);
  }
}
