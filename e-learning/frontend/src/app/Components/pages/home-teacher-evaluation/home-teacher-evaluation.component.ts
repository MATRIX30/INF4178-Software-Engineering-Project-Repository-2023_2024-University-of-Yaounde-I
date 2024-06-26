import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EvaluationDialogComponent } from '../../dialogs/evaluation-dialog/evaluation-dialog.component';
import { DeleteComponent } from '../../dialogs/delete/delete.component';

@Component({
  selector: 'app-home-teacher-evaluation',
  templateUrl: './home-teacher-evaluation.component.html',
  styleUrls: ['./home-teacher-evaluation.component.css']
})
export class HomeTeacherEvaluationComponent {
  displayedColumns: string[] = ['no', 'enonce', 'proposition', 'reponse', 'point', 'action'];
  dataSource = new MatTableDataSource<EvaluationItem>(ELEMENT_DATA);

  constructor(
    private _router: Router,
    private _matDialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  open_evaluation_dialog(mode: string, element: any) {
    let dialog = this._matDialog.open(EvaluationDialogComponent, {
      data: {
        mode: mode,
        element: element
      }
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);

    });
  }

  open_delete_dialog() {
    let dialog = this._matDialog.open(DeleteComponent, {
      data: {
        title: "Suppression de la question",
        message: "La question sélectionnée sera supprimée, voulez vous continuer ?"
      }
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);

    });
  }
}

interface EvaluationItem {
  no: string;
  enonce: string;
  proposition: number;
  reponse: string;
  point: number;
}

const ELEMENT_DATA: EvaluationItem[] = [
  {
    no: "1", enonce: "Enonce de la question", proposition: 3, reponse: '1,3', point: 2
  },
  {
    no: "1", enonce: "Enonce de la question", proposition: 3, reponse: '1,3', point: 2
  },
  {
    no: "1", enonce: "Enonce de la question", proposition: 3, reponse: '1,3', point: 2
  },
  {
    no: "1", enonce: "Enonce de la question", proposition: 3, reponse: '1,3', point: 2
  },
  {
    no: "1", enonce: "Enonce de la question", proposition: 3, reponse: '1,3', point: 2
  }
];
