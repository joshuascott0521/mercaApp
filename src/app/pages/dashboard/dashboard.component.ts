
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LiquidationsSummaryYeasMonthsService } from 'src/app/core/services/liquidations/liquidations-summary-yeas-months.service';

interface DayCard {
  id: number;
  day: string;
  status: 'CERRADO' | 'ABIERTO';
  totalLiquidados: number;
  montoLiquidado: number;
  cantidadPagados: number;
  montoPagado: number;
  cantidadPendientes: number;
  montoPendiente: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  year: string = '2024';
  month: string = 'NOVIEMBRE';
  nombreUsuario: any;
  liquidations: any;  
  fechasConDias: any[] = [];

  years: string[] = ['2023', '2024'];
  months: string[] = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
    constructor(
    private authService: AuthService,
    private router: Router,
    private apiLiquidacionesSummary: LiquidationsSummaryYeasMonthsService
  ) { }
  ngOnInit(): void {
    this.cargarFechas();
    this.nombreUsuario = localStorage.getItem('nombreUsuario')
    // this.apiLiquidacionesSummary.getSummaryYearMonths(2024, 11).subscribe({
    //   next: (data) => {
    //     this.liquidations = data;
    //     console.log('Datos recibidos:', data);
    //   },
    //   error: (error) => {
    //     console.error('Error al consumir la API:', error);
    //   }
    // });
  }


  // dayCards: DayCard[] = [
  //   {
  //     id: 1,
  //     day: "LUNES",
  //     status: "CERRADO",
  //     totalLiquidados: 45,
  //     montoLiquidado: 500000,
  //     cantidadPagados: 40,
  //     montoPagado: 420000,
  //     cantidadPendientes: 5,
  //     montoPendiente: 80000,
  //   },
  //   {
  //     id: 2,
  //     day: "MARTES",
  //     status: "CERRADO",
  //     totalLiquidados: 38,
  //     montoLiquidado: 450000,
  //     cantidadPagados: 35,
  //     montoPagado: 400000,
  //     cantidadPendientes: 3,
  //     montoPendiente: 50000,
  //   },
  //   {
  //     id: 3,
  //     day: "MIERCOLES",
  //     status: "ABIERTO",
  //     totalLiquidados: 38,
  //     montoLiquidado: 450000,
  //     cantidadPagados: 35,
  //     montoPagado: 400000,
  //     cantidadPendientes: 3,
  //     montoPendiente: 50000,
  //   },
  // ];
  cargarFechas(): void {
    const ano = 2024;
    const mes = 11; 

    this.apiLiquidacionesSummary.getSummaryYearMonths(ano, mes).subscribe(
      (fechas) => {
        this.liquidations = fechas;
        console.log('DIA DE LA SEMANA', this.fechasConDias);
        
      },
      (error) => {
        console.error('Error al obtener las fechas:', error);
      }
    );
  }

  onFilter() {
    console.log('Filtering with year:', this.year, 'and month:', this.month);
    // Implementar logica del filtro
  }

  // downloadPDF(dayCard: DayCard) {
  //   console.log('Downloading PDF for', dayCard.day);
  // }

  // viewDetails(dayCard: DayCard) {
  //   console.log('Viewing details for', dayCard.day);
  // }
  

  
}



