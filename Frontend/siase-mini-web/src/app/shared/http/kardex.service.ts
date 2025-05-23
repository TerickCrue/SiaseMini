import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KardexService {
  private baseUrl = 'kardex';

  constructor(private http: HttpClient) { }

  getCareerKardex(careerIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}`);
  }
} 