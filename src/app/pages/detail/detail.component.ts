import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from 'src/app/core/services/detail/detail.service';
import { FilterService } from 'src/app/core/services/filter/filter.service';
interface Month {
  id: number;
  name: string;
  days: number[]
}


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  year!: number;
  month!: any;
  day!: number;
  nombreUsuario!: string;
  payments: any[] = [];
  years: number[] = [];
  months: any[] = [];
  days: number[] = [];
  isLoading: boolean = false;
  datosResumen: any;
  showButton: boolean = false;

  private scrollHeight = 300;
  private pageNumber = 1;
  private pageSize = 10;
  private hasMoreData = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private apiGetFilter: FilterService,
    private getDetails: DetailService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    
    this.route.params.subscribe((params) => {
      console.log('params', params);
      this.year = +params['year'];
      this.month = +params['month'];
      this.day = +params['day'];
  
      this.resetPagination();
      this.getDetailDays();
      this.dataFilter(); // Inicializa los datos del filtro
    });
  }

  getDetailDays() {
    if (!this.hasMoreData) return;
  
    this.isLoading = true;
  
    // Enviar solo el id del mes
    const monthId = this.month?.id || this.month;
  
    this.getDetails.getDetailDays(this.year, monthId, this.day, this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        if (data.length < this.pageSize) {
          this.hasMoreData = false;
        }
        this.payments = [...this.payments, ...data];
        this.isLoading = false;
        this.pageNumber++;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
        this.isLoading = false;
      },
    });
  }
  

  
  dataFilter() {
    this.apiGetFilter.getDataFilter().subscribe(
      (data) => {
        console.log('Filter data:✅✅', data);
  
        this.years = data.years;
        this.months = data.months;
  
        // Buscar y asignar el mes inicial basado en los parámetros
        const selectedMonth = this.months.find((m) => m.id === this.month);
        this.month = selectedMonth ? selectedMonth : this.months[0];
  
        // Inicializar los días del mes seleccionado
        this.days = this.month.days;
  
        console.log('Mes inicial:', this.month);
        console.log('Días del mes inicial:', this.days);
      },
      (error) => {
        console.error('Error fetching filter data:', error);
      }
    );
  }

  private isMonthChanging = false; // Bandera para identificar si el cambio proviene de un cambio de mes

  onFilter(event: { year: number; month: any; day?: number }) {
    // Actualizar el año y el mes seleccionados
    this.year = event.year;
  
    // Detectar si cambió el mes y actualizar los días correspondientes
    if (event.month && event.month.id !== this.month?.id) {
      const selectedMonth = this.months.find((m) => m.id === event.month.id);
      this.month = selectedMonth ? selectedMonth : this.month;
  
      // Actualizar los días del nuevo mes
      this.days = this.month.days;
      console.log('Días actualizados para el mes seleccionado:', this.days);
  
      // Seleccionar el día menor de la nueva colección de días
      this.day = Math.min(...this.days);
      console.log('Nuevo día seleccionado automáticamente:', this.day);
  
      // Indicar que el cambio de día proviene de un cambio de mes
      this.isMonthChanging = true;

      this.resetPagination();
      this.getDetailDays();
    }
  
    // Si cambia el día (y no es por un cambio de mes), recargar las cards
    if (!this.isMonthChanging && event.day && this.day !== event.day) {
      this.day = event.day;
      console.log('Filtrando por día:', this.day);
  
      this.resetPagination();
      this.getDetailDays();
    }
  
    // Resetear la bandera después de manejar el cambio de mes
    if (this.isMonthChanging) {
      this.isMonthChanging = false;
    }
  
    console.log('Datos seleccionados:', this.year, this.month, this.day);
  }
  
  resetPagination() {
    this.pageNumber = 1;
    this.payments = [];
    this.hasMoreData = true;
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    if (!this.isLoading && this.hasMoreData) {
      this.getDetailDays();
    }
  }

  getMonthName(monthNumber: number): string {
    const monthNames = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
      'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    return monthNames[monthNumber - 1] || '';
  }
  getSelectedMonth(): Month {
    return this.months.find(m => m.id === this.month) || { id: this.month, name: this.getMonthName(this.month) };
  }

  getNameDaysForId(array: Month[], idBuscado: number): { name: string; days: number[] } | null {
    const mes = array.find((mes) => mes.id === idBuscado);
    return mes ? { name: mes.name, days: mes.days } : null;}
}