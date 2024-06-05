import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent {

  constructor(
    private _router: Router
  ) { }

  toggle_menu() {
    const body = document.getElementById("navbar");
    if (body != null)
      body.classList.toggle("navbar-mobile");

    const elements = document.getElementsByClassName("mobile-nav-toggle");
    elements[0].classList.toggle('d-none');
  }

  /**
   * Go to register page
   */
  go_to_register_page() {
    this._router.navigateByUrl('register');
  }

  /**
   * Go to login page
   */
  go_to_login_page() {
    this._router.navigateByUrl('login');
  }

}
