import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FilterComponent } from './shared/filter/filter.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { DetailComponent } from './pages/detail/detail.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { PaymentCardComponent } from './shared/payment-card/payment-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContributorComponent } from './pages/contributor/contributor.component';

@NgModule({ declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        FilterComponent,
        LoadingComponent,
        DetailComponent,
        PaginatorComponent,
        PaymentCardComponent,
        ContributorComponent,
    ],
    bootstrap: [AppComponent], imports: [AuthenticationModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
