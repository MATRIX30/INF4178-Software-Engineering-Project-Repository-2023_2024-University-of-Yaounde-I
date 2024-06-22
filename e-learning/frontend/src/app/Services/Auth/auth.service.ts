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
  isUserConnected = false;

  login(email: string, password: string, role: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/student/login";
    if (role == "teacher") url = this._appService.baseUrl + "/api/formateur/login"
    let data = {
      email: email,
      password: password
    }
    return this._http.post<any>(url, data);

  }

  inscription(formdata: any, isFormateurChecked: boolean, domainId: number | null): Observable<any> {

    let url = this._appService.baseUrl + "/api/student/create";
    if (isFormateurChecked) url = this._appService.baseUrl + "/api/formateur/create/" + domainId;

    return this._http.post<any>(url, formdata);

  }

  logout() {
    sessionStorage.removeItem('user');
    this.user = null;
  }
}
