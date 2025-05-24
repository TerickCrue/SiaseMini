export function getMonths() {
    const months: { number: number; name: string }[] = [
        { number: 1, name: 'Enero' },
        { number: 2, name: 'Febrero' },
        { number: 3, name: 'Marzo' },
        { number: 4, name: 'Abril' },
        { number: 5, name: 'Mayo' },
        { number: 6, name: 'Junio' },
        { number: 7, name: 'Julio' },
        { number: 8, name: 'Agosto' },
        { number: 9, name: 'Septiembre' },
        { number: 10, name: 'Octubre' },
        { number: 11, name: 'Noviembre' },
        { number: 12, name: 'Diciembre' },
    ];

    return months;
}

export function getValoresUnicos<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return [...new Set(items.map(item => item[key]))];
}