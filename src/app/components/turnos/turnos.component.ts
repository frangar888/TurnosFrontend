import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/models/turno';
import { MatDialog } from '@angular/material/dialog';
import { TurnosNewComponent } from '../turnos-new/turnos-new.component';
import esLocale from '@fullcalendar/core/locales/es';
import moment from 'moment';
import { TurnosVerComponent } from '../turnos-ver/turnos-ver.component';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  providers: [TurnoService],
})
export class TurnosComponent implements OnInit {
  public turnos: Turno[] = [];
  public eventos: [{ id: string; title: string; date: string }] = [
    { id: '', title: '', date: '' },
  ];
  constructor(private _turnoService: TurnoService, public dialog: MatDialog) {
    this.turnos = [];
  }
  calendarOptions: CalendarOptions = {};
  handleEventClick(info: any) {
    const dialogRef = this.dialog.open(TurnosVerComponent, {
      width: '800px',
      data: {
        _id: info.event.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Grabar') {
        this.cargarTurnos();
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
    this.cargarTurnos();
    console.log(moment.locale());
  }

  cargarTurnos() {
    this._turnoService.getAllTurnos().subscribe(
      (response) => {
        if (response.message) {
          this.turnos = response.message;
          for (let index = 0; index < this.turnos.length; index++) {
            const element = this.turnos[index];
            this.eventos[index] = {
              id: element._id,
              title:
                moment(element.turno_fecha).format('HH:mm') +
                ' - ' +
                element.paciente_nombre,
              date: moment(element.turno_fecha)
                .add(1, 'days')
                .format('YYYY-MM-DD'),
            };
          }
          this.calendarOptions = {
            initialView: 'dayGridMonth',
            locales: [esLocale],
            locale: 'es',
            height: 'auto',
            eventClick: this.handleEventClick.bind(this),
            events: this.eventos,
          };
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newTurno() {
    const dialogRef = this.dialog.open(TurnosNewComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Grabar') {
        this.cargarTurnos();
        window.location.reload();
      }
    });
  }
}
