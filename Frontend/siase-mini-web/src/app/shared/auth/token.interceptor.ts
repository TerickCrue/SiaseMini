import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { from, lastValueFrom, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { environment } from '../../../environments/environment.development';

export const TokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  return from(gestionarPeticion(request, next, authService, alertService));
};

async function gestionarPeticion(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  alertService: AlertService
): Promise<HttpEvent<any>> {
  
  const peticion = await generarPeticion(request, authService);

  return await lastValueFrom(
    next(peticion).pipe(
      catchError((error) => {
        console.log(error)
        if (error.status === 500) {
          alertService.presentAlertError('Ha sucedido un error', error.error);
        } else if (error.status === 401 || error.status === 0) {
          authService.logout();
        } else {
          const MENSAJE_ERROR_INESPERADO = 'Ocurrió un error inesperado.\n Favor de contactar al administrador del sistema.';
          alertService.presentAlertError('Algo salió mal.', MENSAJE_ERROR_INESPERADO);
        }

        return throwError(() => new Error(error));
      })
    )
  );
}

async function generarPeticion(
  request: HttpRequest<any>,
  authService: AuthService
): Promise<HttpRequest<any>> {

  const token = await authService.getToken();
  const baseUrl = environment.urlBackend;

  /* Petición anónima de autentificación */
  if (request.url === 'user' && request.method === 'POST') {
    return request.clone({
      url: baseUrl + request.url,
    });
  }

  /* Peticiones que requiren de un token */
  return request.clone({
    url: baseUrl + request.url,
    setHeaders: {
      'Content-Type': 'application/json, text/plain',
      Authorization: `Bearer ${token}`,
    },
  });
}
