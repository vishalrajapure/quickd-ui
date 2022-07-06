import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Deal } from '../models/Deal';
import { CommonRestService } from '../shared-services/common-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {


  constructor(private commonRestService: CommonRestService) { }


  public submitDeal(deal:any) {
    return this.commonRestService.postMethod(environment.BASE_PATH + 'deals/submitDeal', deal);
  }

  public searchDeals(searchDealsRequest:any):Observable<Deal[]> {
    return this.commonRestService.postMethod(environment.BASE_PATH + 'deals/searchDeals', searchDealsRequest);
  }

  public requestForConfirmation(confirmDealRequest:Deal) {
    return this.commonRestService.postMethod(environment.BASE_PATH + 'deals/requestForConfirmation', confirmDealRequest);
  }
}
