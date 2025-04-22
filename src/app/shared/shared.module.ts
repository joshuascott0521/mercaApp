import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCustomComponent } from './modals/dialog-custom/dialog-custom.component';
import { FilterComponent } from './filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DialogCustomComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule  
  ],
  exports: [FilterComponent]
  
})
export class SharedModule { }
