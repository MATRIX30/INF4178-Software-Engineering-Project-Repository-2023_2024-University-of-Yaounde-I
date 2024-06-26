import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormateurService } from 'src/app/Services/Formateur/formateur.service';
import { ChapitreDialogComponent } from '../../dialogs/chapitre-dialog/chapitre-dialog.component';
import { EvaluationChapitreDialogComponent } from '../../dialogs/evaluation-chapitre-dialog/evaluation-chapitre-dialog.component';
import { EvaluatioDialogComponent } from '../../dialogs/evaluatio-dialog/evaluatio-dialog.component';

@Component({
  selector: 'app-home-teacher-courser-detail',
  templateUrl: './home-teacher-courser-detail.component.html',
  styleUrls: ['./home-teacher-courser-detail.component.css']
})
export class HomeTeacherCourserDetailComponent {

  userStr!: string | null;
  userJson!: any;
  chapitres: any[] = [];
  evaluations: any[] = [];
  cours!: any;
  coursJson!: any;

  displayedColumnsChapitre: string[] = ['no', 'titre', 'duree', 'action'];
  dataSourceChapitre = new MatTableDataSource<Chapitre>(this.chapitres);

  displayedColumnsEvaluation: string[] = ['no', 'titre', 'action'];
  dataSourceEvaluation = new MatTableDataSource<Evaluation>(this.evaluations);

  constructor(
    private _router: Router,
    private _formateurService: FormateurService,
    private _dialog: MatDialog
  ) { }

  @ViewChild('paginator_chapitre') paginator_chapitres!: MatPaginator;
  @ViewChild('paginator_evaluation') paginator_evaluation!: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceChapitre.paginator = this.paginator_chapitres;
    this.dataSourceEvaluation.paginator = this.paginator_evaluation;
  }


  go_to_evaluation_page(element: any) {
    // code ...
    localStorage.setItem('formateur-cours-seleted', JSON.stringify(element));
    this._router.navigateByUrl('/teacher/home/courses/details/evaluation');
  }

  getChapitres(id: number) {
    try {
      this._formateurService.getChapitreByIdCours(id).subscribe(res => {
        console.log(res);
        this.chapitres = res.data;
        this.dataSourceChapitre = new MatTableDataSource<Chapitre>(this.chapitres);

      });
    } catch (error) {
      console.error('une erreur est survenue');
    }
  }

  getEvaluation(chapitres: any[]) {
    for (let c of chapitres) {
      this.evaluations.push(c.evaluations);
    }

    // populate table
    this.dataSourceEvaluation = new MatTableDataSource<Evaluation>(this.evaluations);
  }

  // ajouter un chap
  open_chap_dialog(mode: string, element: any) {
    let dialog = this._dialog.open(ChapitreDialogComponent, {
      data: {
        idcours: this.coursJson.coursId,
        mode: mode,
        element: element
      }, maxWidth: 500
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.getChapitres(this.coursJson.coursId);
      }
    });
  }


  // ajouter une evaluation
  open_eval_dialog() {
    let dialog = this._dialog.open(EvaluatioDialogComponent, {
      data: {

      }
    });

    dialog.afterClosed().subscribe(result => { });
  }

  ngOnInit() {
    // get user
    this.userStr = sessionStorage.getItem('user');
    this.cours = localStorage.getItem('formaeur-cours-selected');

    if (this.cours) {
      this.coursJson = JSON.parse(this.cours);

      // get les chapitres du cours selectionner
      this.getChapitres(this.coursJson.coursId);

      // get les evaluations du cours selectionner
      this.getEvaluation(this.chapitres);
    }

  }

}


interface Chapitre {
  titre: string;
  no: string;
  duree: number;
}


interface Evaluation {
  titre: string;
  no: string;
}

// chapitre dataset
const ELEMENT_DATA_CHAPITRE: Chapitre[] = [
  {
    titre: "UI/UX Design", no: "1", duree: 30
  },
  {
    titre: "UI/UX Design", no: "2", duree: 30
  },
  {
    titre: "UI/UX Design", no: "3", duree: 30
  },
  {
    titre: "UI/UX Design", no: "4", duree: 30
  },
];


// chapitre dataset
const ELEMENT_DATA_EVALUATION: Evaluation[] = [
  {
    titre: "UI/UX Design", no: "1"
  },
  {
    titre: "UI/UX Design", no: "2",
  },
  {
    titre: "UI/UX Design", no: "3",
  },
  {
    titre: "UI/UX Design", no: "4",
  },
];
