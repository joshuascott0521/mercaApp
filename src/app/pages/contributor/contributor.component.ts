import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

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
  contributor: any[] = [
    {
      img: '../../../assets/img/local.png',
      documento: 2121313,
      nombre: 'joshua peres',
      local: 'A4',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 4444444,
      nombre: 'joshua',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 22222222,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 666666,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 7777777,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 8888888,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 99999,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 1000000,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 2357888999,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 4535352,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 1010101010,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 20202020202,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
    {
      img: '../../../assets/img/local.png',
      documento: 2121313,
      nombre: 'joshua suarez',
      local: 'A3',
      categoria: 'A'
    },
  ]; 

  constructor(private dialogService: DialogService){}
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.isLoading = false
  }
  openDialogCustom(){
    this.dialogService.openDialogCustom() 
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
