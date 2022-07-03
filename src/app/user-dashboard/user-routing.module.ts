import { MyDealsComponent } from './my-deals/my-deals.component';
import { PickupParcelComponent } from './pickup-parcel/pickup-parcel.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitDealComponent } from './submit-deal/submit-deal.component';



const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        component: SubmitDealComponent
      },
      {
        path: 'submitdeal',
        component: SubmitDealComponent
      },
      {
        path:'searchdeals',
        component: PickupParcelComponent
      },
      {
        path: 'mydeals',
        component: MyDealsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
