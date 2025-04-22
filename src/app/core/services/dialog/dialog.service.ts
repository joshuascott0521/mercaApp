import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent } from 'src/app/shared/modals/dialog-custom/dialog-custom.component';
import { DialogCustomData } from '../../models/dialogCustomData/dialog-custom-data.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDialogCustom(data?: DialogCustomData){
    this.matDialog.open(DialogCustomComponent)
  }
}
