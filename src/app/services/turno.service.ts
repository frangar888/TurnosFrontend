import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import moment from 'moment';
import { Medico } from '../models/medico';
import { Turno } from '../models/turno';

@Injectable()
export class TurnoService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getAllTurnos(): Observable<any> {
    return this._http.get(this.url + 'getAllTurnos');
  }

  deleteOneTurnoById(_id: string): Observable<any> {
    const body = new HttpParams().set('_id', _id);
    return this._http.post(this.url + 'deleteOneTurnoById/', body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  getOneTurnoById(_id: string): Observable<any> {
    const body = new HttpParams().set('_id', _id);
    return this._http.post(this.url + 'getOneTurnoById/', body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  turnoDeleteMedico(_id: string): Observable<any> {
    const body = new HttpParams().set('_id', _id);
    return this._http.post(this.url + 'turnoDeleteMedico/', body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  turnoAddMedico(_id: string, medico: Medico): Observable<any> {
    const body = new HttpParams()
      .set('_id', _id)
      .set('_id_medico', medico._id)
      .set('nombre', medico.nombre)
      .set('matricula', medico.matricula)
      .set('dni', medico.dni)
      .set('fecha_nac', moment(medico.fecha_nac).format())
      .set('estado', medico.estado);
    return this._http.post(this.url + 'turnoAddMedico/', body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  updateOneTurnoById(turno: Turno): Observable<any> {
    const body = new HttpParams()
      .set('_id', turno._id)
      .set('turno_fecha', moment(turno.turno_fecha).format())
      .set('turno_hora', moment(turno.turno_fecha).format())
      .set('turno_estado', turno.turno_estado)
      .set('turno_costo', turno.turno_costo)
      .set('paciente_dni', turno.paciente_dni)
      .set('paciente_nombre', turno.paciente_nombre)
      .set('paciente_obra_social', turno.paciente_obra_social)
      .set('paciente_motivo_consulta', turno.paciente_motivo_consulta);
    return this._http.post(this.url + 'updateOneTurnoById/', body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  newTurno(turno: any): Observable<any> {
    turno.turno_hora = turno.turno_fecha;
    let params = JSON.stringify(turno);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'newTurno', params, {
      headers: headers,
    });
  }
}
