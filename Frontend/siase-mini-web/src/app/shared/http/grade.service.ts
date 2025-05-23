import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'grades';

  constructor(private http: HttpClient) { }

  getCareerGrades(careerIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}`);
  }

  getGradesDetail(careerIndex: number, gradeIndex: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${careerIndex}/${gradeIndex}`);
  }
} 