import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SujetService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  // liste des sujet
  sujetList: any[] = [];

  getAll(): Observable<any> {
    let url = this._appService.baseUrl + "/api/sujet/get";
    return this._http.get<any>(url);
  }
}
