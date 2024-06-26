import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { DomainService } from 'src/app/Services/Domain/domain.service';
import { SujetService } from 'src/app/Services/Sujet/sujet.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent {

  isScrolled = false;
  params!: searchValue;

  // liste des valeurs pour le autocomplete
  autoCOmpleteList: searchValue[] = [];
  domainList: any[] = [];
  sujetList: any[] = [];

  constructor(
    private _router: Router,
    protected _authService: AuthService,
    private _domainService: DomainService,
    private _sujetService: SujetService,
    private _notifierService: NotifierService
  ) {
    this.filteredOptions = this.autoCOmpleteList.slice();
  }


  @ViewChild('input_search') input_search!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  filteredOptions: searchValue[];


  filter(): void {
    const filterValue = this.input_search.nativeElement.value.toLowerCase();
    this.filteredOptions = this.autoCOmpleteList.filter(o => o.label.toLowerCase().includes(filterValue));
  }

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

  go_to_homepage() {
    let route = "";
    switch (this._authService.user.role) {
      case "Etudiant":
        route = "/user/home/dashboard";
        break;

      case "Formateur":
        route = "/teacher/home/dashboard";
        break;

      default:
        break;
    }

    this._router.navigateByUrl(route);
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

  getDomains() {
    this._domainService.getAll().subscribe(response => {
      // populate list
      this.domainList = response.data;

      // chargement des domaines
      for (let d of this.domainList) {
        this.autoCOmpleteList.push(
          { id: d.domainId, type: "domain", label: d.nom }
        );
      }
    });
  }

  getSujets() {
    try {
      this._sujetService.getAll().subscribe(response => {
        // if no error
        this.sujetList = response.data;

        // chargement des sujet
        for (let s of this.sujetList) {
          this.autoCOmpleteList.push(
            { id: s.sujetId, type: "sujet", label: s.nom }
          );
        }
      });

    } catch (error) {
      this._notifierService.notify('error', 'Une erreur est survenue');

      // display error
      console.log(error);
    }
  }

  search() {
    if (this.myControl.value) {
      console.log(this.params);


    }
  }

  ngOnInit() {
    this.initUserMenu();
    this.getDomains();
    this.getSujets();
  }

}

/**
 * type searchValueAutoCom
 */
interface searchValue {
  id: number
  type: string
  label: string
}
