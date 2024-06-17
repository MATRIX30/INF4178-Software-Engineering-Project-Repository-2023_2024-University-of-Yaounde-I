import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  user!: any;

  login(email: string, password: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/student/login";
    let data = {
      email: email,
      password: password
    }
    return this._http.post<any>(url, data);

  }

  inscription(formdata: any): Observable<any> {
    let url = this._appService.baseUrl + "/api/student/create";

    return this._http.post<any>(url, formdata);

  }
}
