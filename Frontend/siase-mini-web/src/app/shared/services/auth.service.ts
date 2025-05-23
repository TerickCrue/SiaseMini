import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { GeneralConstant } from '../general-constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  public getToken() {
    return this.storageService.getItem(GeneralConstant.TOKEN_KEY);
  }

  public saveToken(token: string) {
    this.storageService.setItem(GeneralConstant.TOKEN_KEY, token);
  }

  public logout(reroute: boolean = true) {
    this.storageService.removeItem(GeneralConstant.TOKEN_KEY);

    if(reroute){
      this.router.navigate(['/acceso/login'])
    }
  }

  public isAuthenticated(){
    const token = this.getToken();

    if(!token){
      return false;
    }
    else{
      const valid = this.validateToken();

      return valid;
    }
  }

  public validateToken() {
    //Aqui deberiamos verificar en el servidor si el token es válido.
    return true;
  }


}
