import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginResponse } from '../models/LoginResposne';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';
import { CommonAuthService } from '../shared-services/common-auth.service';
import { UserRoles } from '../app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  public loginForm!: FormGroup;
  private subscriptions$: Subscription[] = [];
  public loginResponse: LoginResponse = new LoginResponse();
  public errorMsg: string | undefined;
  public Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private router: Router, private signinService: SigninService, private commonAuthService: CommonAuthService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      contactNo: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    this.loginResponse.success = true;
  }

  public ngOnDestroy(): void {
    this.subscriptions$.map(sub => sub && sub.unsubscribe());
  }

  public login(): void {
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
     this.spinnerService.show();
    const loginSub$ = this.signinService.login(this.loginForm.value).subscribe(
      (resp: LoginResponse) => {
        this.loginResponse.success = true;
        console.log('user logged in successfully');
        this.commonAuthService.updateUserInSession(resp);
        this.routeToDashbaord(resp);
        this.spinnerService.hide();
        this.Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        });
      },
      (err) => {
        this.loginResponse.success = false;
        console.log(err);
        this.errorMsg = err.error.message;
         this.spinnerService.hide();
      }
    );
    this.subscriptions$.push(loginSub$);
  }

  public routeToDashbaord(response: any): void {
    if (response && UserRoles.USER === response.userRole) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
