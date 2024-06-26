import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-teacher-courser-detail',
  templateUrl: './home-teacher-courser-detail.component.html',
  styleUrls: ['./home-teacher-courser-detail.component.css']
})
export class HomeTeacherCourserDetailComponent {

  displayedColumnsChapitre: string[] = ['no', 'titre', 'duree', 'action'];
  dataSourceChapitre = new MatTableDataSource<Chapitre>(ELEMENT_DATA_CHAPITRE);

  displayedColumnsEvaluation: string[] = ['no', 'titre', 'action'];
  dataSourceEvaluation = new MatTableDataSource<Evaluation>(ELEMENT_DATA_EVALUATION);


  constructor(
    private _router: Router
  ) { }

  @ViewChild('paginator_chapitre') paginator_chapitres!: MatPaginator;
  @ViewChild('paginator_evaluation') paginator_evaluation!: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceChapitre.paginator = this.paginator_chapitres;
    this.dataSourceEvaluation.paginator = this.paginator_evaluation;
  }


  go_to_evaluation_page() {
    // code ...
    this._router.navigateByUrl('/teacher/home/courses/details/evaluation');
  }

  getCourse(idFormateur: number) {

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
