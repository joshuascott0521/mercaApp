import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { LiquidationDetailsComponent } from './pages/liquidation-details/liquidation-details.component';
import { HeaderComponent } from './shared/header/header.component';
import { FilterComponent } from './shared/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LiquidationDetailsComponent,
    HeaderComponent,
    FilterComponent,
  ],
  imports: [
    AuthenticationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
