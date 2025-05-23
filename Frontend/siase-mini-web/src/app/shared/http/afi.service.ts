import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfiService {
  private baseUrl = 'afis';

  constructor(private http: HttpClient) { }

  getCareerAfis(careerIndex: number, month?: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}/${month}`);
  }

  getAfisHistory(careerIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}`);
  }
} 