import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingComponent } from './landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightComponent } from './flight/flight.component';
import { HotelComponent } from './hotel/hotel.component';
import { FooterComponent } from './footer/footer.component';
import { CarComponent } from './car/car.component';
import { ActivityComponent } from './activity/activity.component';
import { TransferComponent } from './transfer/transfer.component';
import { BusComponent } from './bus/bus.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';


// Import Primeng dependencies - 
import {ButtonModule} from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table'; 
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    FlightComponent,
    HotelComponent,
    FooterComponent,
    CarComponent,
    ActivityComponent,
    TransferComponent,
    BusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  

    NgxPaginationModule,

    ButtonModule,
    ChipsModule,
    CalendarModule,
    TableModule, 
    RatingModule,
    PaginatorModule,

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})

export class AppModule { }

