
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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
export class DashboardComponent {
  year: string = '2024';
  month: string = 'NOVIEMBRE';
  userName: string = 'Joshua Suarez';

  years: string[] = ['2023', '2024'];
  months: string[] = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
    constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  dayCards: DayCard[] = [
    {
      id: 1,
      day: "LUNES",
      status: "CERRADO",
      totalLiquidados: 45,
      montoLiquidado: 500000,
      cantidadPagados: 40,
      montoPagado: 420000,
      cantidadPendientes: 5,
      montoPendiente: 80000,
    },
    {
      id: 2,
      day: "MARTES",
      status: "CERRADO",
      totalLiquidados: 38,
      montoLiquidado: 450000,
      cantidadPagados: 35,
      montoPagado: 400000,
      cantidadPendientes: 3,
      montoPendiente: 50000,
    },
    {
      id: 3,
      day: "MARTES",
      status: "ABIERTO",
      totalLiquidados: 38,
      montoLiquidado: 450000,
      cantidadPagados: 35,
      montoPagado: 400000,
      cantidadPendientes: 3,
      montoPendiente: 50000,
    },
  ];

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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}



