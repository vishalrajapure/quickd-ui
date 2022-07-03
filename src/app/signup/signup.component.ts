import { SignupService } from './signup.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from '../models/LoginResposne';
import { Router } from '@angular/router';
import { CommonAuthService } from '../shared-services/common-auth.service';
import { SignupResponse } from '../models/SignupResponse';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public signupResponse!: SignupResponse;
  private subscription$: Subscription[] = [];

  constructor(
    private router: Router,
    private commonAuthService: CommonAuthService,
    private signupService: SignupService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      contactNo: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscription$.map((sub) => sub && sub.unsubscribe());
  }

  signUp() {
    this.spinnerService.show();
    const signupSub$ = this.signupService
      .signup(this.signupForm.value)
      .subscribe(
        (resp: SignupResponse) => {
          this.signupResponse = resp;
          this.spinnerService.hide();
        },
        (err) => {
          console.log(err);
          this.spinnerService.hide();
        }
      );
    this.subscription$.push(signupSub$);
  }
}
