import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/LoginResposne';
import { CommonRestService } from '../shared-services/common-rest.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private commonRestService: CommonRestService) { }

  public login(payload: any): Observable<LoginResponse> {
    return this.commonRestService.postMethod(environment.BASE_PATH + 'user/login', payload);
  }


}
