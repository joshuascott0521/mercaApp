import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  @Input() nombreUsuario: string = '';



  constructor(private authService: AuthService, private router: Router){}

    logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  viewContributor(){
    this.router.navigate(['/contribuyente'])
    console.log('cpfewkfnqekfnvwñegvlkwnañglk');
    
  }
  viewLiquidaciones(){
    this.router.navigate(['/liquidaciones'])
  }
}
