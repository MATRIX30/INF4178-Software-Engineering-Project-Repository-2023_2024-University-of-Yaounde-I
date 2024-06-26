import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  getCourse(idFormateur: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/getByFormateur/" + idFormateur;
    return this._http.get<any>(url);
  }

  addCourse(data: any, idSujet: number, idFormateur: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/create/" + idSujet + "/" + idFormateur;
    return this._http.post<any>(url, data);
  }
}
