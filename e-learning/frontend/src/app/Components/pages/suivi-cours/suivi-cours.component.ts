import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DateTime } from 'src/app/Models/datetime.interface';
import { CoursService } from 'src/app/Services/Cours/cours.service';
import { DatetimeService } from 'src/app/Services/Datetime/datetime.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { SuiviCoursService } from 'src/app/Services/SuiviCours/suivi-cours.service';

@Component({
  selector: 'app-suivi-cours',
  templateUrl: './suivi-cours.component.html',
  styleUrls: ['./suivi-cours.component.css']
})
export class SuiviCoursComponent {

  constructor(
    private _coursService: CoursService,
    protected _suivicoursService: SuiviCoursService,
    private _notifierService: NotifierService,
    private _datetimeService: DatetimeService,
    protected _loaderService: LoaderService
  ) {

  }

  coursStr: any;
  coursJson: any;
  chapitres: any[] = [];
  datetime: DateTime = new DateTime();
  userStr!: string | null;
  userJson!: any;
  maListeDeCours: any[] = [];
  hasSubscribe = false;

  getchapitres() {
    this._coursService.getChapitres(this.coursJson.coursId).subscribe(response => {
      console.log(response);
      this.chapitres = response.data;
    });
  }

  registerToCourse() {

    // si le user n'est pas connecter on affiche un message
    let userString = sessionStorage.getItem('user');
    if (userString) {
      let userJson = JSON.parse(userString);
      this._loaderService.isLoading = true;

      try {
        this._coursService.suscribe(userJson.studentId, this.coursJson.coursId).subscribe(res => {
          this._loaderService.isLoading = false;
          console.log(res);
          if (res.data.coursId) {
            // notify
            this._notifierService.notify('success', 'Souscription effectuée avec succès');

            // reload page
            window.location.reload();
          } else {
            this._notifierService.notify('error', 'Une erreur est surenue');
            console.error(res.message);
          }

        });
      } catch (error) {
        this._notifierService.notify('error', 'Une erreur est survenue');
        console.error(error);

      }

    } else {
      this._notifierService.notify('default', 'Vous n\'êtes pas connecté');
    }
  }

  getStudentsCours(studentId: number) {
    try {
      this._coursService.getStudentCours(studentId).subscribe(res => {
        this.maListeDeCours = res.data;
        console.log(res);

        // verifier si je suis deja inscrit a ce cours
        this.hasSubscribe = this.maListeDeCours.find((c) => { return c.coursId == this.coursJson.coursId; });
        console.log(this.hasSubscribe);

      });
    } catch (error) {

    }
  }

  ngOnInit() {

    this.coursStr = localStorage.getItem('selectedCourse');
    this.coursJson = JSON.parse(this.coursStr + '');

    // init date
    let d: Date = new Date(this.coursJson.updatedAt);
    this.datetime = this._datetimeService.formatDate(d);

    // get course detail
    this.getchapitres();

    // get user
    this.userStr = sessionStorage.getItem('user');

    if (this.userStr) {
      this.userJson = JSON.parse(this.userStr);

      console.log(this.userJson);


      // verifier si je suis deja inscrit a ce cours
      this.getStudentsCours(this.userJson.studentId);
    }

  }

}
