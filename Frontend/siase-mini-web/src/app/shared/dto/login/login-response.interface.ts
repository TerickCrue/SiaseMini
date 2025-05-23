import { Carrera } from '../carrera/carrera.interface';

export interface LoginResponse {
    nombre: string;
    matricula: string;
    carreras: Carrera[];
    foto: string;
    token: string;
}