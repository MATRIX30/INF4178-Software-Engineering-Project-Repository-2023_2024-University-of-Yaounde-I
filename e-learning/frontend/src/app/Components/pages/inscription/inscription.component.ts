import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(
    private _notifierService: NotifierService,
    private _authService: AuthService
  ) { }

  // user variables
  nom: string = "";
  prenom: string = "";
  email: string = "";
  password: string = "";
  confirmpassword: string = "";
  isFormateurChecked = false;
  role = "Etudiant";

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form control
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmpasswordFormControl = new FormControl('', [Validators.required]);
  nomFormControl = new FormControl('', [Validators.required]);
  prenomFormControl = new FormControl('', [Validators.required]);

  // toggle visibility icon on password variable
  showPassword = false;

  /**
   * Toggle visibility password
   */
  toggle_visibility_password() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.nomFormControl.valid &&
      this.prenomFormControl.valid &&
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmpasswordFormControl.valid) {
      if (this.confirmpassword == this.password) {
        // define data
        let data = {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          role: this.role,
          password: this.password
        }
        this._authService.inscription(data).subscribe(response => {
          if (response.data.errors != undefined) {
            // notify
            this._notifierService.notify('error', response.data.errors[0].message);

            // display error
            console.log(response);

          } else {
            // if success
            this._notifierService.notify('success', 'Inscription effectuée avec succès');

            // clear form
            this.nom = "";
            this.prenom = "";
            this.email = "";
            this.password = "";
            this.confirmpassword = "";

            // display response
            console.log(response);

          }

        });

      } else {
        this._notifierService.notify('error', 'Mot de passe incorrect');
      }

    } else {
      this._notifierService.notify('error', 'Formulaire invalide');
    }

  }



}
