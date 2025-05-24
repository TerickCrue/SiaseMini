import { KardexSubject } from "./kardex-subject.interface";

export interface Kardex {
    carrera: string;
    materias: KardexSubject[];
    nombreAlumno: string;
    planEstudios: string;
}