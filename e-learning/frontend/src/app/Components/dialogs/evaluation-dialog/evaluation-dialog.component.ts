import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluation-dialog',
  templateUrl: './evaluation-dialog.component.html',
  styleUrls: ['./evaluation-dialog.component.css']
})
export class EvaluationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<EvaluationDialogComponent>
  ) { }

  mode = this.data.mode;

  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control -----------------------------------------------
  enonceFormControl = new FormControl('', [Validators.required]);
  propositionsFormControl = new FormControl('', [Validators.required]);
  propositionsStatementFormControl: FormControl[] = [];
  pointFormControl = new FormControl('', [Validators.required]);
  reponseFormControl = new FormControl('', [Validators.required]);

  // variables
  enonce: string = "";
  propositions = 2;
  point: number = 1;
  propositionsStatements: string[] = [];
  reponses: string[] = [];

  onChangePropositionNumber(event: any) {
    // init form control array
    for (let index = 0; index < this.propositions; index++) {
      let control = new FormControl('', [Validators.required]);
      this.propositionsStatementFormControl.push(control);
    }
  }

  valid() {

  }

  ngOnInit(): void {

    // init form control array
    for (let index = 0; index < this.propositions; index++) {
      let control = new FormControl('', [Validators.required]);
      this.propositionsStatementFormControl.push(control);
    }

  }
}
