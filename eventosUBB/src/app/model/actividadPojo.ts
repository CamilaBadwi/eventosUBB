import { Time } from '@angular/common';

export class actividadPojo {
    constructor( 
        public nombreActividad: string,
        public horaInicioActividad: Time,
        public horaFinActividad: Time,
        public ubicacionActividad: string,
        public descripcionActividad: string,
        public jornada_idJornada: number,
        public expositor: string,
        public evento: number
    ){}
}