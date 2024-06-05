import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {
  toggle_menu() {
    const body = document.getElementById("navbar");
    if (body != null)
      body.classList.toggle("navbar-mobile");

    const elements = document.getElementsByClassName("mobile-nav-toggle");
    elements[0].classList.toggle('d-none');
  }
}
