import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.scss']
})
export class ContributorComponent implements OnInit {
  
  isLoading: boolean = true;
  nombreUsuario!: string;
  name!: string;
  document!: number;
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.isLoading = false
  }
  // onFilter(selectedYear: number, selectedMonth: Month) {
  //   if (this.year !== selectedYear || this.month.id !== selectedMonth.id) {
  //     console.log('Año o mes cambiado:', selectedYear, selectedMonth.id);
  //     this.year = selectedYear;
  //     this.month = selectedMonth;
  
  //     // Ejecutar procedimiento para actualizar las cards
  //     // this.loadLiquidations();
  //   }
  // }

}
