import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiquidationsSummaryYeasMonthsService {
  private apiLiquiSummary = environment.apiUrl

  constructor(private http: HttpClient) { }

 
  getSummaryYearMonths(ano: number, mes: number): Observable<any[]> {
    const url = `${this.apiLiquiSummary}/liquidaciones/resumenDiaByAnoMes?ano=${ano}&mes=${mes}`;
    return this.http.get<any[]>(url).pipe(
      map((fechas) =>
        fechas.map((fecha) => ({
          ...fecha,
          diaSemana: this.obtenerDiaSemana(fecha.ano, fecha.mes, fecha.dia),
        }))
      )
    );
  }
  obtenerDiaSemana(ano: number, mes: number, dia: number): string {
    const fecha = new Date(ano, mes - 1, dia);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[fecha.getDay()];
  }
}
