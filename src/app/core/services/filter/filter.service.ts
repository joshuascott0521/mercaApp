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

  getDataFilter(): Observable<{ years: number[], months: { id: number, name: string, days: number[] }[] }> {
    const url = `${this.apiForFilter}/liquidaciones/liquidacionesAnoMesDTO`;
  
    return this.http.get<any[]>(url).pipe(
      map(dataFilter => {
        // Extraer los años
        const years = dataFilter.map(item => item.ano);
  
        // Extraer los meses y días asociados
        const months = dataFilter.flatMap(item => 
          item.meses.map((mesObj: any) => ({
            id: mesObj.mes,
            name: this.monthNames[mesObj.mes - 1],
            days: mesObj.dias
          }))
        );
  
        return { years, months };
      })
    );
  }
  
}