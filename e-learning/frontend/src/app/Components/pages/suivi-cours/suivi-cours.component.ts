import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CoursService } from 'src/app/Services/Cours/cours.service';
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
    private _notifierService: NotifierService
  ) {

  }

  coursStr: any = localStorage.getItem('selectedCourse');
  coursJson: any = JSON.parse(this.coursStr);
  chapitres: any[] = [];

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
      this._coursService.suscribe(userJson.studentId, this.coursJson.coursId).subscribe(res => {
        console.log(res);

        // notify

      });

    } else {
      this._notifierService.notify('default', 'Vous n\'êtes pas connecté');
    }
  }

  ngOnInit() {
    // get course detail
    this.getchapitres();
  }

}
