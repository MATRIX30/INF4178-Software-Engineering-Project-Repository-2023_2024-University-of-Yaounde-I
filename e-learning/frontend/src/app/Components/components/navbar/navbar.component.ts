import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent {

  constructor(
    private _router: Router,
    protected _authService: AuthService
  ) { }

  isScrolled = false;

  toggle_menu() {
    const body = document.getElementById("navbar");
    if (body != null)
      body.classList.toggle("navbar-mobile");

    const elements = document.getElementsByClassName("mobile-nav-toggle");
    elements[0].classList.toggle('d-none');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
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

  logout() {
    this._authService.logout();
    this._router.navigateByUrl('home');
  }


  initUserMenu() {
    let userString = sessionStorage.getItem('user');

    if (userString) {
      this._authService.user = JSON.parse(userString);
      this._authService.isUserConnected = true;
    } else {
      this._authService.isUserConnected = false;
    }

  }

  ngOnInit() {
    this.initUserMenu();
  }

}
