import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/Services/Cours/cours.service';

@Component({
  selector: 'app-home-user-cours-non-termine',
  templateUrl: './home-user-cours-non-termine.component.html',
  styleUrls: ['./home-user-cours-non-termine.component.css']
})
export class HomeUserCoursNonTermineComponent {

  constructor(
    private _coursService: CoursService,
    private _router: Router
  ) { }

  userStr!: string | null;
  userJson!: any;
  maListeDeCours: any[] = [];

  getStudentsCours(studentId: number) {
    try {
      this._coursService.getStudentCours(studentId).subscribe(res => {
        this.maListeDeCours = res.data;
        console.log(res);
      });
    } catch (error) {

    }
  }

  ngOnInit() {
    // get user
    this.userStr = sessionStorage.getItem('user');

    if (this.userStr) {
      this.userJson = JSON.parse(this.userStr);

      // verifier si je suis deja inscrit a ce cours
      this.getStudentsCours(this.userJson.studentId);
    } else {
      this._router.navigateByUrl('/login');
    }
  }


}
