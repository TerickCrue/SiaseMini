import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarAfi } from '../dto/afi/calendar-afi.interface';
import { AfiHistory } from '../dto/afi/afi-history.interface';

@Injectable({
  providedIn: 'root'
})
export class AfiService {
  private baseUrl = 'afis';

  constructor(private http: HttpClient) { }

  getCareerAfis(careerIndex: number, month?: number): Observable<CalendarAfi[]> {
    return this.http.get<CalendarAfi[]>(`${this.baseUrl}/${careerIndex}/${month}`);
  }

  getAfisHistory(careerIndex: number): Observable<AfiHistory> {
    return this.http.get<AfiHistory>(`${this.baseUrl}/${careerIndex}/history`);
  }
} 