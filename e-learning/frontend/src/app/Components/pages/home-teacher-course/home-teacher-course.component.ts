import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormateurCoursDialogComponent } from '../../dialogs/formateur-cours-dialog/formateur-cours-dialog.component';

@Component({
  selector: 'app-home-teacher-course',
  templateUrl: './home-teacher-course.component.html',
  styleUrls: ['./home-teacher-course.component.css']
})
export class HomeTeacherCourseComponent {
  displayedColumns: string[] = ['titre', 'niveau', 'chapitre', 'sujet', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(
    private _router: Router,
    private _matDialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  go_to_chapitres() {
    // code ...
    this._router.navigateByUrl('/teacher/home/courses/details');
  }

  open_cours_dialog(mode: string, element: any) {
    let dialog = this._matDialog.open(FormateurCoursDialogComponent, {
      data: {
        mode: mode,
        element: element
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result != false) {

        console.log(result);


      }

    });
  }
}



interface PeriodicElement {
  titre: string;
  niveau: string;
  chapitres: number;
  sujet: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },

];
