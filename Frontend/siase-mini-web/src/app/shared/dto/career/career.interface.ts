import { CareerDetail } from "./career-detail.interface";

export interface Career {
    nombre: string;
    claveDependencia: string;
    claveUnidad: string;
    claveNivelAcademico: string;
    claveGradoAcademico: string;
    claveModalidad: string;
    clavePlanEstudios: string;
    claveCarrera: string;

    careerDetail?: CareerDetail;
} 