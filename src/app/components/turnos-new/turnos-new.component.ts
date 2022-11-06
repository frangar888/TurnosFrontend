import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { Medico } from 'src/app/models/medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurnoService } from 'src/app/services/turno.service';
import { MedicoService } from 'src/app/services/medico.service';

interface ObrasSociales {
  obraSocial: string;
}

@Component({
  selector: 'app-turnos-new',
  templateUrl: './turnos-new.component.html',
  providers: [TurnoService, MedicoService],
})
export class TurnosNewComponent {
  public turno: Turno;
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
    public dialogRef: MatDialogRef<TurnosNewComponent>,
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
    this.cargarMedicos();
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

  onSubmit() {
    var fecha = new Date(this.turno.turno_fecha);
    var hora = this.turno.turno_hora!.toString().split(':');
    fecha.setHours(Number.parseInt(hora[0]));
    fecha.setMinutes(Number.parseInt(hora[1]));
    this.turno.turno_fecha = fecha;
    this._turnoService.newTurno(this.turno).subscribe(
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
