import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  // liste des cours
  coursList: any[] = [];

  getAll(): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/get";
    return this._http.get<any>(url);
  }

  getBySujetID(sujetID: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/getBySujet/" + sujetID;
    return this._http.get<any>(url);
  }

  getSubcribers(coursID: any): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/getStudentCount/" + coursID;
    return this._http.get<any>(url);
  }

  getByID(id: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/get/" + id;
    return this._http.get<any>(url);
  }

  getChapitres(idCours: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/chapitre/getbyidcours/" + idCours;
    return this._http.get<any>(url);
  }

  suscribe(student: number, coursId: number): Observable<any> {
    let data = {
      studentId: student,
      coursId: coursId
    }
    let url = this._appService.baseUrl + "/api/cours/addStudentToCours/";
    return this._http.post<any>(url, data);
  }

  getStudentCours(studentId: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/student/" + studentId + "/cours";
    return this._http.get<any>(url);
  }
}
