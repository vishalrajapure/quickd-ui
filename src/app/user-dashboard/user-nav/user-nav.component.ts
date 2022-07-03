import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public updateActiveClass() {
    let links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', function () {
        links.forEach((linkd) => linkd.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }


}
