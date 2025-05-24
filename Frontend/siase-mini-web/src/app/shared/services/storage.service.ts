import { Injectable } from '@angular/core';
import { GeneralConstant } from '../general-constant';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Guardar un valor (como string o lo convierte si es objeto)
  setItem(key: string, value: any): void {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  // Obtener un valor como string o parseado si es JSON
  getItem<T = any>(key: string): T | null {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return item as T;
    }
  }

  // Eliminar un valor
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    localStorage.removeItem(GeneralConstant.USER_DATA_KEY);
    localStorage.removeItem(GeneralConstant.USER_SELECTED_CAREER_KEY);
  }
}
