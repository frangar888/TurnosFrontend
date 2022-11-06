import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import moment from 'moment';

@Injectable()
export class MedicoService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getAllMedicos(): Observable<any> {
    return this._http.get(this.url + 'getAllMedicos');
  }
}
