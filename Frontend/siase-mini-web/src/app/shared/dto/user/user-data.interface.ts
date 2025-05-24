import { Career} from '../career/career.interface';

export interface UserData {
    nombre: string;
    matricula: string;
    carreras: Career[];
    foto: string;
    token: string;
}