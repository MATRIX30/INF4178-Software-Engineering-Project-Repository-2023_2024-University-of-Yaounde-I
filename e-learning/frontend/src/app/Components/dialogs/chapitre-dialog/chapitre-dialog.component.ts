import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { FormateurService } from 'src/app/Services/Formateur/formateur.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';

@Component({
  selector: 'app-chapitre-dialog',
  templateUrl: './chapitre-dialog.component.html',
  styleUrls: ['./chapitre-dialog.component.css']
})
export class ChapitreDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<ChapitreDialogComponent>,
    private _formateurService: FormateurService,
    protected _loaderService: LoaderService,
    private _notifierService: NotifierService
  ) { }

  mode = this.data.mode;
  idcours = this.data.idcours;

  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control -----------------------------------------------
  titreFormControl = new FormControl('', [Validators.required]);
  positionFormControl = new FormControl('', [Validators.required]);
  texteFormControl = new FormControl('', [Validators.required]);
  dureeFormControl = new FormControl('', [Validators.required]);

  // variables
  titre!: string; // nom
  position!: string;
  duree!: number;
  texte!: string;

  valid() {
    if (this.titreFormControl.valid && this.positionFormControl.valid && this.dureeFormControl.valid) {
      try {
        this._loaderService.isLoading = true;
        let dataform = {
          titre: this.titre,
          position: this.position,
          textes: this.texte,
          duree: this.duree,
        }
        this._formateurService.addChap(dataform, this.idcours).subscribe(res => {
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
}
