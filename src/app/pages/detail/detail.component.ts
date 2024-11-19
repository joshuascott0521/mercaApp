import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/core/services/filter/filter.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
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

  constructor(
    private route: ActivatedRoute,
    private apiGetFilter: FilterService
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    
    this.route.params.subscribe(params => {
      this.year = +params['year'];
      this.month = +params['month'];
      this.day = +params['day'];
      this.dataFilter();
    });
  }

  dataFilter() {
    this.apiGetFilter.getDataFilter().subscribe(
      (data) => {
        this.years = data.years;
        this.months = data.months;
        this.days = Array.from({length: 31}, (_, i) => i + 1); // Genera dias de el 1-31
        this.loadPayments();
      },
      (error) => {
        console.error('Error fetching filter data:', error);
      }
    );
  }

  loadPayments() {
    this.isLoading = true;
    this.isLoading = false;
  }

  onFilter(event: {year: number, month: any, day?: number}) {
    this.year = event.year;
    this.month = event.month;
    this.day = event.day || this.day;
    this.loadPayments();
  }
}