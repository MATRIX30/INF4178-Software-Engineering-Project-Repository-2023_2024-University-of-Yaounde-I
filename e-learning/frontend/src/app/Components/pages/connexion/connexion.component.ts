import { Component } from '@angular/core';




@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  
 // toggle visibility icon on password variable
 showPassword = true;

 /**
  * Toggle visibility password
  */
 toggle_visibility_password() {
   this.showPassword = !this.showPassword;
 }

}
