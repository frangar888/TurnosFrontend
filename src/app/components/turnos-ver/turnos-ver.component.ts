import { Component, Inject, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { Medico } from 'src/app/models/medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurnoService } from 'src/app/services/turno.service';
import { MedicoService } from 'src/app/services/medico.service';
import moment from 'moment';

interface ObrasSociales {
  obraSocial: string;
}
export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-turnos-ver',
  templateUrl: './turnos-ver.component.html',
  providers: [TurnoService, MedicoService],
})
export class TurnosVerComponent {
  public _id: string = '';
  public turno: Turno;
  public selectedMedico: Medico = new Medico('', '', '', 0, new Date(), 0);
  public _id_medico_inicial: string | null = '';
  public medicos: Medico[] = [];
  public obras_sociales: ObrasSociales[] = [
    { obraSocial: 'OSDE' },
    { obraSocial: 'AVALIAN' },
    { obraSocial: 'SANCOR' },
    { obraSocial: 'JERARQUICOS' },
    { obraSocial: 'SAN CRISTOBAL' },
    { obraSocial: 'IAPOS' },
  ];
  constructor(
    public dialogRef: MatDialogRef<TurnosVerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _turnoService: TurnoService,
    private _medicoService: MedicoService
  ) {
    this.turno = new Turno(
      '',
      new Date(),
      null,
      0,
      0,
      new Medico('', '', '', 0, new Date(), 0),
      0,
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit(): void {
    this._id = this.data._id;
    this.obtenerTurno(this._id);
    this.cargarMedicos();
  }

  obtenerTurno(_id: string) {
    this._turnoService.getOneTurnoById(_id).subscribe(
      (response) => {
        if (response.message) {
          this.turno = response.message;
          this.turno.turno_fecha_str = moment(this.turno.turno_fecha)
            .add(1, 'days')
            .format('YYYY-MM-DD');
          this.turno.turno_hora_str = moment(this.turno.turno_fecha)
            .add(1, 'days')
            .format('HH:mm');
          this.selectedMedico = this.turno.medico;
          if (this.selectedMedico == null) {
            this._id_medico_inicial = null;
          } else {
            this._id_medico_inicial = this.selectedMedico._id;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  compareMedicos(option1: Medico, option2: Medico) {
    return option1._id === option2._id;
  }

  cargarMedicos() {
    this._medicoService.getAllMedicos().subscribe(
      (response) => {
        if (response.message) {
          this.medicos = response.message;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarCambios() {
    var fecha = new Date(this.turno.turno_fecha_str);
    var hora = this.turno.turno_hora_str!.toString().split(':');
    fecha.setHours(Number.parseInt(hora[0]));
    fecha.setMinutes(Number.parseInt(hora[1]));
    this.turno.turno_fecha = fecha;
    this._turnoService.updateOneTurnoById(this.turno).subscribe(
      (response) => {
        if (response.status == 'success') {
          if (this._id_medico_inicial != null) {
            this.borrarMedicoAnt();
          } else {
            this.addNewMedico();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(fecha);
  }

  borrarMedicoAnt() {
    console.log('entro aca');
    this._turnoService.turnoDeleteMedico(this.turno._id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.addNewMedico();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewMedico() {
    this._turnoService
      .turnoAddMedico(this.turno._id, this.turno.medico)
      .subscribe(
        (response) => {
          if (response.status == 'success') {
            this.dialogRef.close('Grabar');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteTurno() {}
  onSubmit() {
    this.guardarCambios();
  }
  borrar() {
    this._turnoService.deleteOneTurnoById(this.turno._id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.dialogRef.close('Grabar');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
