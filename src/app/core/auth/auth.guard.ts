import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log("Auth:");
    console.log(this.authService.isAuthenticated());

    if (this.authService.isAuthenticated()) {
      return true;
    }
  
    this.router.navigate(['/login']);  // Redirige al login si no está autenticado
    return false;
  }
}