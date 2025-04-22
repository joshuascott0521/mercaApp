import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogCustomData } from 'src/app/core/models/dialogCustomData/dialog-custom-data.model';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-custom',
  templateUrl: './dialog-custom.component.html',
  styleUrl: './dialog-custom.component.scss'
})
export class DialogCustomComponent {
  document!: number;
  name!: string;
    isLoading: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogCustomData){}

  onFilter(event: {  }) {}


} 