import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { FormateurService } from 'src/app/Services/Formateur/formateur.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';

@Component({
  selector: 'app-formateur-cours-dialog',
  templateUrl: './formateur-cours-dialog.component.html',
  styleUrls: ['./formateur-cours-dialog.component.css']
})
export class FormateurCoursDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<FormateurCoursDialogComponent>,
    private _formateurService: FormateurService,
    protected _loaderService: LoaderService,
    private _notifierService: NotifierService
  ) { }

  mode = this.data.mode;
  sujetList = this.data.sujetList;
  idformateur = this.data.idformateur;

  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control -----------------------------------------------
  sujetFormControl = new FormControl('', [Validators.required]);
  titreFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  langueFormControl = new FormControl('', [Validators.required]);
  niveauFormControl = new FormControl('', [Validators.required]);
  dureeFormControl = new FormControl('', [Validators.required]);
  chapitreFormControl = new FormControl('', [Validators.required]);

  // variables
  sujet!: number;
  titre!: string; // nom
  description!: string;
  chapitres!: number;
  duree!: number;
  niveau!: string;
  langue!: string;

  valid() {
    if (this.sujetFormControl.valid && this.titreFormControl.valid && this.descriptionFormControl.valid) {
      try {
        this._loaderService.isLoading = true;
        let dataform = {
          nom: this.titre,
          description: this.description,
          nombreModule: this.chapitres,
          tempsApprentissage: this.duree,
          niveau: this.niveau,
          langue: this.langue
        }
        this._formateurService.addCourse(dataform, this.sujet, this.idformateur).subscribe(res => {
          console.log(res);
          this._loaderService.isLoading = false;

          this._notifierService.notify('success', 'Opération effectuée avec succès');
          this._dialogRef.close(true);

        });
      } catch (error) {
        this._loaderService.isLoading = false;
        this._notifierService.notify('error', 'Une erreur est survenue');
      }
    }

  }

  ngOnInit(): void {

  }
}
