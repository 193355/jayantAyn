import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { BusComponent } from './bus/bus.component';
import { CarComponent } from './car/car.component';
import { FlightComponent } from './flight/flight.component';
import { HotelComponent } from './hotel/hotel.component';
import { LandingComponent } from './landing/landing.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
    {path: '', redirectTo: 'landing', pathMatch: 'full' },
    {path: 'landing', component: LandingComponent },
    {path: 'hotel' ,component: HotelComponent},
    {path: 'flight' ,component: FlightComponent},
    {path: 'car' ,component: CarComponent},
    {path: 'activity' ,component: ActivityComponent},
    {path: 'transfer' ,component: TransferComponent},
    {path: 'bus' ,component: BusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
