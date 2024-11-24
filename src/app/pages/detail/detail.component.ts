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
      this.year = params['year'];
      this.month = +params['month'];
      this.day = +params['day'];
      this.resetPagination();
      this.getDetailDays();
      this.dataFilter();
      this.getNameDaysForId(this.months,this.month.id)
    });
  }

  getDetailDays() {
    if (!this.hasMoreData) return;
    
    this.isLoading = true;
    this.getDetails.getDetailDays(this.year, this.month, this.day, this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        console.log("Received data:", data);
        if (data.length < this.pageSize) {
        this.dataFilter()

          this.hasMoreData = false;
        console.log("Received data:", this.month);

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
        console.log('Filter data:✅✅', data.months);
        
        this.years = data.years;
        this.months = data.months;
        console.log('meses:::::', this.months);
        
        // Set default values
        this.year = this.years[0];
        this.month = this.months;

        this.days = Array.from({ length: 31 }, (_, i) => i + 1);
        // Load initial data
        // this.loadLiquidations();
      },
      (error) => {
        console.error('Error fetching filter data:', error);
      }
    );
  }


  onFilter(event: { year: number; month: any; day?: number }) {
    this.year = event.year;
    this.month = event.month.id;
    console.log('IDDDDDD', event.month.id);

    
    this.day = event.day || this.day;
    this.months = this.months
    console.log('✅✅✅✅',this.months);
    
    const prueba = this.getNameDaysForId(this.months, event.month.id)
    console.log('ESTA ES LA  PRUEBAAAA', prueba);
    
    console.log('Filtered data:', this.year, this.month, this.day);
    
    this.resetPagination();
    this.getDetailDays();
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