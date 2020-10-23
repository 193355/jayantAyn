import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotelsInfo: any = [];
  constructor(private http: HttpClient) {}

  //hotel Inventory
   getHotelInventory(){
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "3c97535fc4116f636a52ee31593e5fe2e2cefea1"
    }
    return this.http.get('https://api.lamasoo.com/booking/hotel_inventory', { headers })   
   }

   
  //hotel Amenities
   getAmenities(){
     const headers = {
      "Content-Type": "application/json",
      "Authorization": "3c97535fc4116f636a52ee31593e5fe2e2cefea1"
     }
     return this.http.get('https://api.lamasoo.com/booking/amenities',{ headers })
   }

}
