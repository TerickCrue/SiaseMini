import { Subject } from './subject.interface';

export interface WeekSchedule {
  lunes: Subject[];
  martes: Subject[];
  miercoles: Subject[];
  jueves: Subject[];
  viernes: Subject[];
  sabado: Subject[];

  [key: string]: Subject[]; 
}
