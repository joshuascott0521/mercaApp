import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() years: string[] = [];
  @Input() months: string[] = [];
  @Input() days: string[] = [];
  @Input() selectDay: string = '';
  @Input() selectedYear: string = '';
  @Input() selectedMonth: string = '';
  @Output() filter = new EventEmitter<void>();

  onFilter(){
    this.filter.emit();
  }
}

