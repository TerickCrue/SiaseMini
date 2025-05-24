import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from '../dto/schedule/period.interface';
import { WeekSchedule } from '../dto/schedule/week-schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseUrl = 'schedules';

  constructor(private http: HttpClient) { }

  getCareerSchedules(careerIndex: number): Observable<Period[]> {
    return this.http.get<Period[]>(`${this.baseUrl}/${careerIndex}`);
  }

  getScheduleDetail(careerIndex: number, schedulePeriod: string): Observable<WeekSchedule> {
    return this.http.get<WeekSchedule>(`${this.baseUrl}/${careerIndex}/${schedulePeriod}`);
  }
} 