import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiForFilter = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  getDataFilter(): Observable<{years: number[], months: {id: number, name: string}[]}> {
    const url = `${this.apiForFilter}/liquidaciones/liquidacionesAnoMesDTO`;
    return this.http.get<any[]>(url).pipe(
      map(dataFilter => {
        const years = [...new Set(dataFilter.map(item => item.ano))];
        const monthNumbers = [...new Set(dataFilter.flatMap(item => item.mes))];
        const months = monthNumbers.map(num => ({
          id: num,
          name: this.monthNames[num - 1]
        }));
        return { years, months };
      })
    );
  }
}