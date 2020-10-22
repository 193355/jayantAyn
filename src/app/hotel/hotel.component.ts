import { MapsAPILoader } from '@agm/core';
import { HttpClient} from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit{
  public form: FormGroup;
  latitude: number;
  longitude: number;
  public hotel: any = [];
  zoom:number;
  address: string;
  private geoCoder;
  hotelsIv:any = [];
  regForm :FormGroup
  isReadonly: boolean = true;
  submitted = false;
  private rate:number = 3;
  public iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  dir= undefined;
  previous;
  latlngBounds: any;
  autocompleteSource: any = '';
  autocompleteDestination :any = '';
  public waypoints: any = []

  defaultImage: any = `../../assets/hotel/private_pool.jpg`;
   hotelId: string;
  constructor(private http: HttpClient,private mapsAPILoader: MapsAPILoader,private ngZone:
    NgZone,private fb: FormBuilder,private formBuilder:FormBuilder,private router: Router,private actRoute: ActivatedRoute) {
      // this.hotelId = JSON.stringify(this.actRoute.snapshot.params["id"]);
      // this.router.navigateByUrl("/hotelinfo" , <any>this.hotelId)
      setTheme('bs3')
      this.form = this.fb.group({
        rating: ['', Validators.required],
      })

    window.scroll(0,0);
    this.form = this.fb.group({
      rating : ['',Validators.required]
    })
  }
  
  ngOnInit() {
    this.getDirection();
    this.setCurrentLocation();
    this.getHotelInventory();

    this.regForm = this.formBuilder.group({
      source: ['',Validators.required]
    })

    $(document).ready(function () {
      $('.slider_new').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
        responsive: [{
          breakpoint: 767,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
          {
            breakpoint: 400,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
          }]
      });
    });

    $(document).ready(function (){
      $('.slider, slideset').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
          {
            breakpoint: 400,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
          }]
      });
    });

    $(document).ready(function () {
      $('.slideset').slick({
        slidesToShow: 2,
        autoplay: true,
        arrows: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 850,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
          }
        }]
      });
    });

//google api autocomplete

    this.setCurrentLocation();
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       // const autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
    //       //   types: ['address']
    //       // });
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });

    this.mapsAPILoader.load().then(() => {
      //source
      let txtFrom: any = document.getElementById('txtFrom');
      this.autocompleteSource = new google.maps.places.Autocomplete(txtFrom, {
        componentRestrictions : { country: "IR" },
        types: ['(cities)']
      });
      google.maps.event.addListener(this.autocompleteSource, 'place_changed', () => {
        debugger
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = this.autocompleteSource.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });

      //destination
      let txtTo: any = document.getElementById('txtTo');
      this.autocompleteDestination = new google.maps.places.Autocomplete(txtTo, {
        componentRestrictions : { country: "IR" },
        types: ['(cities)']
      });
      google.maps.event.addListener(this.autocompleteDestination, 'place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = this.autocompleteDestination.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    })
  }
  
  
  //set location
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
    this.geoCoder.geocode({ 'location':
    {lat: this.latitude,lng: this.longitude}},
    (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        }
        else {
          window.alert('No results found');
        }
      }

       else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }


  //get hotel inventory
  getHotelInventory(){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     "Authorization": "3c97535fc4116f636a52ee31593e5fe2e2cefea1",
    //   })
    // };
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "3c97535fc4116f636a52ee31593e5fe2e2cefea1"
    }
    return this.http.get('https://api.lamasoo.com/booking/hotel_inventory', { headers })
    .subscribe(dt =>{
      this.hotelsIv = dt['hotels'];
      this.latitude = parseFloat(dt['latitude']);
      this.longitude = parseFloat(dt['longitude']);
      console.log(dt);
    })
  }

    onMouseOver(marker) {
       this.iconUrl = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }


//marker click info
    clickedMarker(infowindow) {
      debugger
      if (this.previous) {
        this.previous.close();
      }
      this.previous = infowindow;
    }
    //set default image
    changeSource(event){
      event.target.src = this.defaultImage;
    }
    // mapReady(map) {
    //   const bonds: LatLngBounds = new google.maps.LatLngBounds();
    //   bonds.extend(new google.maps.LatLng(this.latitude, this.longitude));
    //   map.fitBounds(bonds);
    // }
    getDirection() {
      this.dir = {
        origin: {
          latitude: 38.889931,
          longitude: -77.009003
        },
        destination:{
          latitude: 40.730610,
          longitude: -73.935242    
        }   
      }
    }

  
    // public change(event: any) {
    //   this.waypoints = event.request.waypoints;
    //   console.log(this.waypoints)
    // }

   
}
