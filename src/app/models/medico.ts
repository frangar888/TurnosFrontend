export class Medico {
  constructor(
    public _id: string,
    public nombre: string,
    public matricula: string,
    public dni: number,
    public fecha_nac: Date,
    public estado: number
  ) {}
}
