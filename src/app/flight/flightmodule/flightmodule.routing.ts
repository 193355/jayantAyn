import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

//   {
//     path: '',
//     children: [
//       {
//         path: 'flight',
//         loadChildren: () => import('../flightmodule/flightmodule.module').then(module => module.FlightmoduleModule)
//       }
//     ]
//   }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
