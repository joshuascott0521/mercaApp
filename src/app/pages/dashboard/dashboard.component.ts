import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilterService } from 'src/app/core/services/filter/filter.service';
import { LiquidationsSummaryYeasMonthsService } from 'src/app/core/services/liquidations/liquidations-summary-yeas-months.service';

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
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiLiquidacionesSummary: LiquidationsSummaryYeasMonthsService,
    private apiGetFilter: FilterService
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.dataFilter();
  }

  dataFilter() {
    this.apiGetFilter.getDataFilter().subscribe(
      (data) => {
        console.log('Filter data:', data);
        
        this.years = data.years;
        this.months = data.months;
        
        // Set default values
        this.year = this.years[0];
        this.month = this.months[0];

        // Load initial data
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
    console.log('Filtering with year:', selectedYear, 'and month:', selectedMonth.id);
    this.year = selectedYear;
    this.month = selectedMonth;
    this.loadLiquidations();
  }
  viewDetail(card: any) {
    this.router.navigate(['/detail', this.year, this.month.id, card.dia]);
  }
}