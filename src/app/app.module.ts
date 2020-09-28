import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

