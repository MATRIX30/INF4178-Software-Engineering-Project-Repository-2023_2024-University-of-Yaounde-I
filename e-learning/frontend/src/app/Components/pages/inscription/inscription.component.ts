import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { DomainService } from 'src/app/Services/Domain/domain.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(
    private _notifierService: NotifierService,
    private _authService: AuthService,
    protected _loaderService: LoaderService,
    protected _domainService: DomainService
  ) { }

  // user variables
  nom: string | null = "";
  prenom: string | null = "";
  email: string | null = "";
  password: string | null = "";
  confirmpassword: string | null = "";
  domainID!: number | null;
  isFormateurChecked = false;
  dateNaissance: Date | null = new Date();
  sexe!: string | null;
  role = "Etudiant";

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form control
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmpasswordFormControl = new FormControl('', [Validators.required]);
  nomFormControl = new FormControl('', [Validators.required]);
  prenomFormControl = new FormControl('', [Validators.required]);
  sexeFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required]);

  domainFormControl = new FormControl({ value: -1, disabled: true }, [Validators.required]);
  fileFormControl = new FormControl('', [Validators.required]);

  // toggle visibility icon on password variable
  showPassword = false;

  /**
   * Toggle visibility password
   */
  toggle_visibility_password() {
    this.showPassword = !this.showPassword;
  }

  onChangeDomain() {
    this.domainFormControl.enable();
  }

  register() {
    if (this.nomFormControl.valid &&
      this.prenomFormControl.valid &&
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmpasswordFormControl.valid &&
      this.sexeFormControl.valid &&
      this.dateFormControl.valid
    ) {
      if (this.confirmpassword == this.password) {

        // define data
        let data: any;

        // if teacher
        if (this.isFormateurChecked) {

          // verifier si le domain et le fichier ont ete renseigner
          if (this.domainFormControl.valid) {
            console.log(this.domainID);
            // add file and domainID
            data = {
              nom: this.nom,
              prenom: this.prenom,
              email: this.email,
              role: "Formateur",
              password: this.password,
              preference: "default",
              sexe: this.sexe,
              cv: "cv-test",
              dateNaissance: this.dateNaissance
            }
          } else {
            this._notifierService.notify('error', 'Formualire invalide');
            return;
          }
        } else {
          this.domainID = null;
          data = {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            preference: "default",
            sexe: this.sexe,
            role: "Etudiant",
            password: this.password,
            dateNaissance: this.dateNaissance,
          }
        }

        // start loader
        this._loaderService.isLoading = true;
        try {
          this._authService.inscription(data, this.isFormateurChecked, this.domainID).subscribe(response => {

            console.log(response);

            // stop loading
            this._loaderService.isLoading = false;
            if (response.data == undefined) {
              // notify
              this._notifierService.notify('error', 'Une erreur est survenue.');

              // display error
              console.log(response);

            } else {
              // if success
              this._notifierService.notify('success', this.isFormateurChecked ? 'Votre demande a été envoyé. Vous recevrez un email en cas de validation.' : 'Inscription effectuée avec succès');

              // clear form
              // this.nom = null;
              // this.prenom = null;
              // this.email = null;
              // this.password = null;
              // this.confirmpassword = null;
              // this.sexe = null;
              // this.domainID = null;

              // display response
              console.log(response);

            }

          });
        } catch (error) {
          // stop loading
          this._loaderService.isLoading = false;

          this._notifierService.notify('error', 'Une erreur est survenue');

        }


      } else {
        this._notifierService.notify('error', 'Mot de passe incorrect');
      }

    } else {
      this._notifierService.notify('error', 'Formulaire invalide');
    }

  }

  getDomains() {
    this._domainService.getAll().subscribe(response => {
      this._domainService.domaineList = response.data;
      console.log(response);
    });
  }

  ngOnInit() {
    // get domain for teacher
    this.getDomains();
  }



}
