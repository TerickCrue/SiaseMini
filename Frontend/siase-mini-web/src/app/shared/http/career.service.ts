import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../dto/career/career.interface';
import { CareerDetail } from '../dto/career/career-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private baseUrl = 'careers';

  constructor(private http: HttpClient) { }

  getUserCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(this.baseUrl);
  }

  getCareerDetail(careerIndex: number): Observable<CareerDetail> {
    return this.http.get<CareerDetail>(`${this.baseUrl}/${careerIndex}`);
  }
} 