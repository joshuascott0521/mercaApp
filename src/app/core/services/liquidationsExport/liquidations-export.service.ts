import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquidationsExportService {
  private baseUrl = 'https://apimercappdev.creapptech.com/liquidaciones';

  constructor(private http: HttpClient) { }

  exportSummaryByYearMonth(year: number, month: number): Observable<any> {
    const url = `${this.baseUrl}/exportarResumenLiquidacionesByDia?ano=${year}&mes=${month}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportDetailByYearMonthDay(year: number, month: number, day: number): Observable<any> {
    const url = `${this.baseUrl}/exportarLiquidacionesByDia?ano=${year}&mes=${month}&dia=${day}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}

