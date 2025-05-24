import { CompletedAfi } from "./completed-afi.interface";

export interface AfiHistory {
    completadas: number,
    total: number;
    afis: CompletedAfi[]
}