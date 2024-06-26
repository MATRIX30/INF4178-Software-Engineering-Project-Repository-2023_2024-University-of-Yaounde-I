import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormateurCoursDialogComponent } from '../../dialogs/formateur-cours-dialog/formateur-cours-dialog.component';
import { FormateurService } from 'src/app/Services/Formateur/formateur.service';
import { NotifierService } from 'angular-notifier';
import { SujetService } from 'src/app/Services/Sujet/sujet.service';

@Component({
  selector: 'app-home-teacher-course',
  templateUrl: './home-teacher-course.component.html',
  styleUrls: ['./home-teacher-course.component.css']
})
export class HomeTeacherCourseComponent {


  userStr!: string | null;
  userJson!: any;
  maListeDeCour: any[] = [];
  displayedColumns: string[] = ['titre', 'niveau', 'chapitre', 'sujet', 'action'];
  dataSource = new MatTableDataSource<any>(this.maListeDeCour);

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    protected _formateurService: FormateurService,
    private _notifierService: NotifierService,
    protected _sujetService: SujetService,
  ) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  go_to_chapitres(element: any) {
    // code ...
    localStorage.setItem('formaeur-cours-selected', JSON.stringify(element));
    this._router.navigateByUrl('/teacher/home/courses/details');
  }

  open_cours_dialog(mode: string, element: any) {
    let dialog = this._matDialog.open(FormateurCoursDialogComponent, {
      data: {
        mode: mode,
        element: element,
        sujetList: this._sujetService.sujetList,
        idformateur: this.userJson.formateurId
      }, maxWidth: 500
    });

    dialog.afterClosed().subscribe(result => {
      if (result != false) {
        console.log(result);
      }

    });
  }

  getCourse(id: number) {
    try {
      this._formateurService.getCourse(id).subscribe(res => {
        this.maListeDeCour = res.data;
        console.log(res.data);

        this.dataSource = new MatTableDataSource<any>(this.maListeDeCour);
      });
    } catch (error) {
      this._notifierService.notify('error', 'Une erreur est survenue');
    }

  }

  getSujets() {
    try {
      this._sujetService.getAll().subscribe(response => {
        // if no error
        this._sujetService.sujetList = response.data;

        // log
        console.log(this._sujetService.sujetList);

      });

    } catch (error) {
      this._notifierService.notify('error', 'Une erreur est survenue');

      // display error
      console.log(error);
    }
  }

  ngOnInit() {
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.userJson = JSON.parse(userString);
      this.getCourse(this.userJson.formateurId);
      console.log(this.userJson);
    }

    // get sujet
    this.getSujets();

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
