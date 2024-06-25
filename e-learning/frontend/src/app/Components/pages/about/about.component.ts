import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(
    private _router: Router
  ) { }
  go_to_register_page() {
    this._router.navigateByUrl('register');
  }


}
