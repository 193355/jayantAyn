import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../shared/services/hotel.service';

@Component({
  selector: 'app-hotelinfo',
  templateUrl: './hotelinfo.component.html',
  styleUrls: ['./hotelinfo.component.css']
})
export class HotelinfoComponent implements OnInit {
  latitude: number;
  longitude: number;
  hotelsInfo:any = [];
  sigleHotelArr: any = [];
  amenitiesArr: any = [];
  singleAmenitiesArr: any= [];
  id:any;
  defaultImage: any = `../../assets/hotel/private_pool.jpg`;
  
  constructor(private http: HttpClient,private route: ActivatedRoute,private hotelServices: HotelService) {}

  ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.hotelServices.getHotelInventory().subscribe(dt => {
    this.hotelsInfo = dt['hotels'];
    console.log(dt);

    this.hotelsInfo.filter(hotel =>{
      if(hotel.id == this.id){  
        this.show(hotel);
      }

    })
  })  
  
  //amenities
  this.hotelServices.getAmenities().subscribe(amn =>{
  this.amenitiesArr = amn;
  console.log("amenities", amn);
    // this.amenitiesArr.filter(amnI =>{
    //   if(amnI.id == this.id){    
    //   }
    // })

  })
}

  show(hotel) {
    this.sigleHotelArr.push(hotel);
    this.sigleHotelArr.filter(hotel => {
      console.log(hotel.room_types);
    })
  } 
  // getAmenities(amenities){
  //   this.singleAmenitiesArr.push(amenities);
  //   this.singleAmenitiesArr.filter(amenities =>{
  //     console.log(amenities.kind);
  //   })
  // }
  changeSource(event){
    event.target.src = this.defaultImage;
  }

  

}
