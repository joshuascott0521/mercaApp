import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from 'src/app/core/services/detail/detail.service';
import { FilterService } from 'src/app/core/services/filter/filter.service';

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
  showButtton: boolean = false;

  private scrollHeight = 300;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private apiGetFilter: FilterService,
    private router: Router,
    private getDetails: DetailService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    
    this.route.params.subscribe((params) => {
      console.log('paramss', params);
      this.year = +params['year'];
      this.month = +params['month'];
      this.day = +params['day'];
      this.getDetailDays(this.year,this.month,this.day)
      this.dataFilter();
    });
  }

  getDetailDays(ano: number, mes: number, dia: number) {
    
    this.getDetails.getDetailDays(ano, mes, dia).subscribe({
      next: (data) => {
        console.log("AQUIIIIIIIIIIIIIII",data); // Procesa los datos
        this.payments = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      },
    });
  }

  dataFilter() {
    this.apiGetFilter.getDataFilter().subscribe(
      (data) => {

        this.years = data.years;
        this.months = data.months;
        this.days = Array.from({ length: 31 }, (_, i) => i + 1);
        // this.loadPayments();
      },

      (error) => {
        console.error('Error fetching filter data:', error);
      }
    );
  }

  // loadPayments() {
  //   this.isLoading = true;
 
  //   this.isLoading = false;
  // }

  onFilter(event: { year: number; month: any; day?: number }) {
    this.year = event.year;
    this.month = event.month;
    this.day = event.day || this.day;

    // this.loadPayments();
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void{
    const  yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButtton = (yOffSet || scrollTop) > this.scrollHeight;
  }
  onScrollTop():void{
    this.document.documentElement.scrollTop =  0
  }
  onScrollDown():void{
    
  }
}
