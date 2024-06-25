import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _notifierService: NotifierService,
    protected _loaderService: LoaderService
  ) { }

  // user variables
  email: string = "";
  password: string = "";
  role: string = "";

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form control
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  roleFormControl = new FormControl('', [Validators.required]);

  // toggle visibility icon on password variable
  showPassword = true;

  /**
   * Toggle visibility password
   */
  toggle_visibility_password() {

    this.showPassword = !this.showPassword;
  }

  connexion() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid && this.roleFormControl) {

      try {
        // start loader
        this._loaderService.setIsLoading(true);
        this._authService.login(this.email, this.password, this.role).subscribe(response => {

          // stop loader
          this._loaderService.setIsLoading(false);

          console.log(response);


          if (response.data != undefined) {
            this._authService.user = response.data;

            // save user in session
            sessionStorage.setItem('user', JSON.stringify(this._authService.user));
            this._authService.isUserConnected = true;



            // navigate to appropriate page
            switch (this._authService.user.role) {
              case "Etudiant":
                this._router.navigateByUrl('/user/home/dashboard');
                break;

              case "Formateur":
                this._router.navigateByUrl('/teacher/home/dashboard');
                break;

              default:
                console.error("UNKNOW ROLE");
                break;
            }

          } else {
            this._notifierService.notify('error', 'Email ou mot de passe incorrect');
          }

        });
      } catch (error) {
        // stop loader
        this._loaderService.setIsLoading(false);

        this._notifierService.notify('error', 'Une erreur est survenue');
        console.error(error);

      }


    } else {
      this._notifierService.notify('error', 'Formulaire invalide');
    }

  }

}
