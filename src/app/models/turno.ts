import { Time } from '@angular/common';
import { Medico } from './medico';

export class Turno {
  constructor(
    public _id: string,
    public turno_fecha: Date,
    public turno_hora: Time | null,
    public turno_estado: number,
    public turno_costo: number,
    public medico: Medico,
    public paciente_dni: number,
    public paciente_nombre: string,
    public paciente_obra_social: string,
    public paciente_motivo_consulta: string,
    public turno_fecha_str: string,
    public turno_hora_str: string
  ) {}
}
