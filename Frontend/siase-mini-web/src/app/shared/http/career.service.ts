import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private baseUrl = 'careers';

  constructor(private http: HttpClient) { }

  getDetail(careerIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}`);
  }
} 