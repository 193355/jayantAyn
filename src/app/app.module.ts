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

// angular google map -
import { AgmCoreModule, GoogleMapsAPIWrapper, InfoWindowManager, MapsAPILoader, MarkerManager } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction


import { NgxPaginationModule } from 'ngx-pagination';
import { MalihuScrollbarModule, MalihuScrollbarService } from 'ngx-malihu-scrollbar';

// Import Primeng dependencies - 
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';


import { NgxStarsModule } from 'ngx-stars';

// Scrollbar imports -
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    MalihuScrollbarModule.forRoot(),

    RatingModule,

    // angular google map -
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYK6xoFMQVDlvgAXzo--AU75Qjv2jOdI0',
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    AgmDirectionModule,     // agm-direction
   

    ButtonModule,
    ChipsModule,
    CalendarModule,
    TableModule,
    RatingModule,
    PaginatorModule,
    TooltipModule,

    NgxStarsModule,

    // Scrollbar imports
    PerfectScrollbarModule

  ],

  // For Scrollbar Import -
  providers: [MalihuScrollbarService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, 
    InfoWindowManager,
    GoogleMapsAPIWrapper,
    MarkerManager
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }

