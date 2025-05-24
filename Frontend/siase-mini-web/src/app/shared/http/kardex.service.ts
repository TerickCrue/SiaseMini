import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kardex } from '../dto/kardex/kardex.interface';

@Injectable({
  providedIn: 'root'
})
export class KardexService {
  private baseUrl = 'kardex';

  constructor(private http: HttpClient) { }

  getCareerKardex(careerIndex: number): Observable<Kardex> {
    return this.http.get<Kardex>(`${this.baseUrl}/${careerIndex}`);
  }
} 