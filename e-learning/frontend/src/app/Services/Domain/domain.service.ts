import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  // liste des domaines
  domaineList: any[] = [];

  getAll(): Observable<any> {
    let url = this._appService.baseUrl + "/api/domain/get";
    return this._http.get<any>(url);
  }
}
