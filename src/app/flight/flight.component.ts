import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  hotels:any = [];
  datas:any = [];
  @ViewChild('search',{static: true})

  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private http: 
    HttpClient) {
    window.scroll(0,0);
   }
  
  ngOnInit(): void {
    this.getHotels();
    this.getData();
    this.setCurrentLocation();
    
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
  
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });      
  }


   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  
  getHotels(){
    return this.http.get("https://fake-hotel-api.herokuapp.com/api/hotels")
    .subscribe(data =>{
          this.hotels = data;
    })
  }

  getData(){
    return this.http.get('https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow').subscribe
    (dt =>{
          this.datas = dt;
          console.log(this.datas);
    })
  }

}
