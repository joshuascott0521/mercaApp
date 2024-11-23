import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDetailDays(ano: number, mes: number, dia: number, pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const endPoint = `/liquidaciones/byAnoMesDia`;
    const url = `${this.apiUrl}${endPoint}?ano=${ano}&mes=${mes}&dia=${dia}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get(url);
  }
}