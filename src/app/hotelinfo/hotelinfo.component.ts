import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotelinfo',
  templateUrl: './hotelinfo.component.html',
  styleUrls: ['./hotelinfo.component.css']
})
export class HotelinfoComponent implements OnInit {
  latitude: number;
  longitude: number;
  hotelsInfo:any = [];
  id:any;

  constructor(private http: HttpClient,private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getHotelsInfo();
    this.id = this.route.snapshot.params['id'];
    //console.log(this.route.snapshot.params['id']);
    this.getId();

    this.route.params.forEach((params: Params) => {
       if(params['id'] !== undefined ){
         const id = +params['id'];
       }

    })
  }


  getHotelsInfo(){
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "3c97535fc4116f636a52ee31593e5fe2e2cefea1"
    }
    return this.http.get('https://api.lamasoo.com/booking/hotel_inventory', { headers })
    .subscribe(dt => {
      this.hotelsInfo = dt['hotels'];
      console.log(dt);
    })
  }

  getId(){

  }
  // selectHotel(){
  //   const selectedHotel = this.
  // }
}
