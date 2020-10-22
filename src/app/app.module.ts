import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarsModule } from 'ngx-stars';
import { SplitButtonModule } from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AgmDirectionModule } from 'agm-direction';
import { HotelinfoComponent } from './hotelinfo/hotelinfo.component';



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
    BusComponent,
    HotelinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxStarsModule,
    BrowserAnimationsModule,
    SplitButtonModule,
    ToastModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxPqdmg2ouIJZs4SKNHC3N2Qbi7mdboFY',
      libraries: ['places']
    }),
   
  ],
  providers: [NgxSpinnerService,MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }

