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
  @Input() days: number[] = []
  @Input() selectedYear!: number;
  @Input() selectedMonth!: Month;
  @Input() selectedDay?: number;
  @Input() showDayFilter: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() filter = new EventEmitter<{year: number, month: Month, day?: number}>();

  onFilter(){
    this.filter.emit({year: this.selectedYear,
       month: this.selectedMonth,
       day: this.showDayFilter ? this.selectedDay : undefined
      });
  }
}