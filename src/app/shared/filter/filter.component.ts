import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Month {
  id: number;
  name: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() years: number[] = [];
  @Input() months: Month[] = [];
  @Input() days: number[] = [];
  @Input() selectedYear!: number;
  @Input() selectedMonth!: Month;
  @Input() selectedDay?: number;
  @Input() document!: number;
  @Input() name: string = "";
  @Input() showUserFilter: boolean = false;
  @Input() showDayFilter: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() filter = new EventEmitter<{ year: number, month: Month, day?: number }>();
  @Output() filterYearMonth = new EventEmitter<{ year: number, month: Month }>();
  @Output() filterUser = new EventEmitter<{document:number,name:string}>

  // Emitir evento cuando cambie el año o el mes
  onYearOrMonthChange() {
    if (this.showDayFilter) {
      console.log('Evento emitido:', this.selectedYear, this.selectedMonth, this.selectedDay);
      this.filter.emit({
        year: this.selectedYear,
        month: this.selectedMonth,
        day: this.selectedDay
      });
    }if(this.showUserFilter){
      console.log('entro al filtro');
      console.log('Evento emitido:',this.document, this.name);
      this.filterUser.emit({
        
        document: this.document,
        name: this.name
      })
      
    }
     else {
      this.filter.emit({
        year: this.selectedYear,
        month: this.selectedMonth,
        day: this.selectedDay
      });
    }

    
    
  }
}
