import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseUrl = 'schedules';

  constructor(private http: HttpClient) { }

  getCareerSchedules(careerIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}`);
  }

  getScheduleDetail(careerIndex: number, scheduleIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}/${scheduleIndex}`);
  }
} 