import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from './user-nav/user-nav.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { PickupParcelComponent } from './pickup-parcel/pickup-parcel.component';
import { SubmitDealComponent } from './submit-deal/submit-deal.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    UserDashboardComponent,
    UserNavComponent,
    SubmitDealComponent,
    PickupParcelComponent,
    MyDealsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserDashboardModule { }
