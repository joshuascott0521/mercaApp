import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilterService } from 'src/app/core/services/filter/filter.service';
import { LiquidationsSummaryYeasMonthsService } from 'src/app/core/services/liquidations/liquidations-summary-yeas-months.service';
import { LiquidationsExportService } from 'src/app/core/services/liquidationsExport/liquidations-export.service';

interface Month {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  year!: number;
  month!: Month;
  nombreUsuario!: string;
  liquidations: any[] = []; 
  years: number[] = [];
  months: Month[] = [];
  isLoading: boolean = true;
  selectYear!: number;
  selectMonth!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiLiquidacionesSummary: LiquidationsSummaryYeasMonthsService,
    private apiGetFilter: FilterService,
    private liquidationsExportService: LiquidationsExportService
  ) { 

  }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.dataFilter();
  }

  getClosestMonth(currentYear: number, currentMonth: number): { year: number, month: Month } {
    // Verificar si el año actual está en la lista
    if (this.years.includes(currentYear)) {
      // Filtrar meses del año actual
      const availableMonths = this.months.filter(month => month.id <= currentMonth);
      
      // Si hay meses válidos, toma el más cercano
      if (availableMonths.length > 0) {
        return { year: currentYear, month: availableMonths[availableMonths.length - 1] };
      }
    }
  
    // Si no hay meses válidos en el año actual, tomar el mes más cercano del año anterior
    const previousYear = Math.max(...this.years.filter(year => year < currentYear));
    if (previousYear) {
      const previousYearMonths = this.months.filter(month => month.id > 0); // Todos los meses
      return { year: previousYear, month: previousYearMonths[previousYearMonths.length - 1] };
    }
  
    // Por defecto, seleccionar el primer año y mes disponibles
    return { year: this.years[0], month: this.months[0] };
  }
  

  dataFilter() {
    this.apiGetFilter.getDataFilter().subscribe(
      (data) => {
        console.log('Filter data:', data);
        
        this.years = data.years;
        this.months = data.months;
        
        // Obtener fecha actual del servidor
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
  
        // Obtener el mes y año iniciales
        const closestDate = this.getClosestMonth(currentYear, currentMonth);
        this.year = closestDate.year;
        this.month = closestDate.month;
  
        // Cargar datos iniciales
        this.loadLiquidations();
      },
      (error) => {
        console.error('Error fetching filter data:', error);
      }
    );
  }
  

  loadLiquidations() {
    if (this.year && this.month) {
      this.isLoading = true;
      this.apiLiquidacionesSummary.getSummaryYearMonths(this.year, this.month.id).subscribe({
        next: (data) => {
          this.liquidations = data;
          console.log('Liquidations loaded:', this.liquidations);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading liquidations:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onFilter(selectedYear: number, selectedMonth: Month) {
    if (this.year !== selectedYear || this.month.id !== selectedMonth.id) {
      console.log('Año o mes cambiado:', selectedYear, selectedMonth.id);
      this.year = selectedYear;
      this.month = selectedMonth;
  
      // Ejecutar procedimiento para actualizar las cards
      this.loadLiquidations();
    }
  }
  

  viewDetail(card: any) {
    this.router.navigate(['/detail', this.year, this.month.id, card.dia]);
  }

  exportYearMonthSummary() {
    this.isLoading = true;
    this.liquidationsExportService.exportSummaryByYearMonth(this.year, this.month.id)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `resumen_liquidaciones_${this.year}_${this.month.id}.xls`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error exporting year-month summary:', error);
          this.isLoading = false;
        }
      });
  }

  exportDayDetail(day: number) {
    this.isLoading = true;
    this.liquidationsExportService.exportDetailByYearMonthDay(this.year, this.month.id, day)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `detalle_liquidaciones_${this.year}_${this.month.id}_${day}.xls`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error exporting day detail:', error);
          this.isLoading = false;
        }
      });
  }
}

