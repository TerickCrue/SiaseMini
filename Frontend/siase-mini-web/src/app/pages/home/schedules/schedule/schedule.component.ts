import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeekSchedule } from '../../../../shared/dto/schedule/week-schedule.interface';
import { Subject } from '../../../../shared/dto/schedule/subject.interface';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnChanges {

  @Input() loading!: boolean | null;
  @Input() schedule: WeekSchedule = {
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
  };

  columns = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  rows: any[] = [];


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schedule'] && changes['schedule'].currentValue) {
      this.setSchedule();
    }
  }

  private setSchedule() {
    const horariosMap: { [key: string]: any } = {};

    //Reunir materias por bloque de horario
    this.columns.forEach((day) => {
      const subjects = this.schedule[day as keyof WeekSchedule] || [];
      subjects.forEach((subject: Subject) => {
        const key = `${subject.horaInicio}-${subject.horaFin}`;

        if (!horariosMap[key]) {
          horariosMap[key] = {
            horaInicio: subject.horaInicio,
            horaFin: subject.horaFin,
          };
        }

        horariosMap[key][day] = `${subject.nombreCorto}<br>${subject.salon}`;
      });
    });

    //Convertimos en array y ordenamos por horaInicio
    const sortedRows = Object.values(horariosMap).sort(
      (a, b) => this.parseHour(a.horaInicio) - this.parseHour(b.horaInicio)
    );

    //Agregar huecos entre bloques
    const completeRows: any[] = [];
    for (let i = 0; i < sortedRows.length; i++) {
      const current = sortedRows[i];
      completeRows.push(current);

      const next = sortedRows[i + 1];
      if (next) {
        const currentEnd = this.parseHour(current.horaFin);
        const nextStart = this.parseHour(next.horaInicio);

        if (currentEnd < nextStart) {
          // Hay un hueco
          completeRows.push({
            horaInicio: this.formatHour(currentEnd),
            horaFin: this.formatHour(nextStart),
            // los días quedan vacíos
          });
        }
      }
    }

    this.rows = completeRows;
  }

  //Convierte "10:30 am" a minutos
  private parseHour(hora: string): number {
    const [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier.toLowerCase() === 'pm' && hours < 12) hours += 12;
    if (modifier.toLowerCase() === 'am' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  //Convierte minutos a formato "hh:mm am/pm"
  private formatHour(totalMinutes: number): string {
    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const modifier = hours >= 12 ? 'pm' : 'am';

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${hours}:${minutes.toString().padStart(2, '0')} ${modifier}`;
  }
}
