import { Component, OnInit } from '@angular/core';
import { CommonAuthService } from '../shared-services/common-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private commonAuthService: CommonAuthService) { }

  ngOnInit(): void {
  }

  validLogin() {
    if ((sessionStorage.getItem('userRole')) && (sessionStorage.getItem('username'))) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
          sessionStorage.clear();
          this.commonAuthService.updateUserRole(''); //making user roll to known while logging out
          this.router.navigate([''])
  }


}
