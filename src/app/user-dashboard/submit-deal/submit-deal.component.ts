import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { Subscription } from 'rxjs/internal/Subscription';
import Swal from 'sweetalert2';
import { UserDashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-submit-deal',
  templateUrl: './submit-deal.component.html',
  styleUrls: ['./submit-deal.component.css']
})
export class SubmitDealComponent implements OnInit {

  private subscription$: Subscription[] = [];
  constructor(private userDashboardService: UserDashboardService, private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
  }

  public dealForm = new FormGroup({
    dealTotal: new FormControl('', []),
    //SENDER DETAILS
    sender: new FormGroup({
      senderContactNo: new FormControl('', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]),
      senderFirstName: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      senderLastName: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
    }),
    //RECEIVER DETAILS
    receiver: new FormGroup({
      receiverContactNo: new FormControl('', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]),
      receiverFirstName: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      receiverLastName: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
    }),
    //PICKUP LOCATION DETAILS
    pickUpLocation: new FormGroup({
      street: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      district: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      pinCode: new FormControl('', [Validators.required,   Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(100)]),
    }),

    //DROP LOCATION DETAILS
    dropLocation: new FormGroup({
      street: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      district: new FormControl('', [Validators.required,  Validators.minLength(1), Validators.maxLength(100)]),
      pinCode: new FormControl('', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(100)]),
    }),

    //PARCEL DETAILS
    parcel: new FormGroup({
      parcelWeight: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      parcelLength: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
      specialInstruction: new FormControl('')
    })
  });


  public submitDeal(){
    console.log(this.dealForm);
    this.spinnerService.show();
    const addDealSub$ = this.userDashboardService.submitDeal(this.dealForm.value).subscribe(
      (resp) => {
        console.log('New deal has been submitted successfully');
        this.fireSwal();
        this.spinnerService.hide();
      },
      (err) => {
        console.log('Error while submitting the deal');
        this.spinnerService.hide();
    });
    this.subscription$.push(addDealSub$);
  }

  public fireSwal(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Deal has been saved successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
