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
    let url = this._appService.baseUrl + "/api/cours/getStudents/" + coursID;
    return this._http.get<any>(url);
  }
}
