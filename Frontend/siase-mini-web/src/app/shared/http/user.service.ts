import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../dto/login/login-request.interface';
import { LoginResponse } from '../dto/login/login-response.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl = "user"

  constructor(
    private http: HttpClient
  ) { }

  public authenticateUser(request: LoginRequest){
    return this.http.post<LoginResponse>(this.dataUrl, request);
  }

}
