import { AccceptDealRequest } from './../../models/AcceptDealRequest';
import { Carrier } from './../../models/Carrier';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Deal } from 'src/app/models/Deal';
import Swal from 'sweetalert2';
import { UserDashboardService } from '../user-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickup-parcel',
  templateUrl: './pickup-parcel.component.html',
  styleUrls: ['./pickup-parcel.component.css'],
})
export class PickupParcelComponent implements OnInit {
  private subscriptions$: Subscription[] = [];
  public AVAILABLE_DEAL_LIST!: Deal[];
  public displayDealsFlag = false;
  public config: any;
  public searchString: any;
  public selectedDeal: Deal | null = null;
  public acceptDealRequest !: AccceptDealRequest;

  constructor(
    private userDashboardService: UserDashboardService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.AVAILABLE_DEAL_LIST?.length || 0,
    };
  }

  public Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  ngOnInit(): void {
     this.selectedDeal = null;
  }

  ngOnDestroy(): void {
    this.subscriptions$.map((sub) => sub && sub.unsubscribe());
  }
  //******************************************* PICK UP PARCEL CONFIG *******************************************

  public searchDealForm = new FormGroup({
    //CONTACT NUMBER
    carrierContactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    //CURRENT LOCATION DETAILS
    currentLocation: new FormGroup({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      district: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
    }),

    //DESTINATION DETAILS
    destination: new FormGroup({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      district: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
    }),
  });

  public searchDeals() {
    if (this.searchDealForm.invalid) {
      Swal.fire({
        template: '#submitCheckDealForm',
      });
      return;
    }
    this.spinnerService.show();
    const addDealSub$ = this.userDashboardService
      .searchDeals(this.searchDealForm.value)
      .subscribe(
        (resp) => {
          this.spinnerService.hide();
          this.AVAILABLE_DEAL_LIST = resp;
          this.displayDealsFlag = true;
        },
        (err) => {
          console.log('Error while submitting the deal');
          this.spinnerService.hide();
          this.displayDealsFlag = false;
        }
      );
    this.subscriptions$.push(addDealSub$);
  }

  key: string = 'id';
  reverse: boolean = true;
  public sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public pageChanged(event: any) {
    this.config.currentPage = event;
  }

  public checkDeal(deal: any) {
    this.selectedDeal = deal;
  }

  public requestForConfirmation() {
    const carrierContactNumber = this.searchDealForm!.get('carrierContactNumber')!.value;
    const loggedInUserContactNumber = sessionStorage!.getItem('username');
    if (carrierContactNumber && loggedInUserContactNumber && this.selectedDeal ) {
        let carrier = new Carrier();
        carrier.carrierContactNo = carrierContactNumber;
        this.selectedDeal!.carrier = carrier;
        this.acceptDealRequest = new AccceptDealRequest();
        this.acceptDealRequest.selectedDeal = this.selectedDeal;
        this.acceptDealRequest.loggedInUserContactNumber = loggedInUserContactNumber
    } else {
      Swal.fire('Carrier contact number is required', 'error');
      return;
    }
    this.spinnerService.show();
    const acceptDealSub$ = this.userDashboardService
      .requestForConfirmation(this.acceptDealRequest)
      .subscribe(
        (resp) => {
          this.spinnerService.hide();
          Swal.fire('Accepted!', '', 'success');
          this.router.navigate(['/searchdeals']);
        },
        (err) => {
          this.spinnerService.hide();
          console.log('Error while accepting the deal');
        }
      );
    this.subscriptions$.push(acceptDealSub$);
  }
}
