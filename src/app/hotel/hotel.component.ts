import { GoogleMapsAPIWrapper, InfoWindowManager, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';

import { HotelsService } from '../shared/services/hotels.service';

import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

// scrollbar import -
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


declare var $: any;

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {
  // Hotel list array-
  hotelDetails: any = [];

  // This is for pagination-
  itemsPerPage = 4;

  // google maps zoom level
  latitude: number;
  longitude: number;
  zoom: number = 8;
  address: string;
  private geoCoder;

  // This is for star rating -
  one_star_rating: number = 1;
  two_star_rating: number = 2;
  three_star_rating: number = 3;
  four_star_rating: number = 4;
  five_star_rating: number = 5;

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;


  // Scrollbar Import -
  @ViewChild(PerfectScrollbarComponent, null) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, null) directiveRef?: PerfectScrollbarDirective;
  previous: any;

  constructor(private hotelService: HotelsService,
    private mScrollbarService: MalihuScrollbarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    _loader: MapsAPILoader,
    _infoWindowManager: InfoWindowManager,
    _el: ElementRef,
    _mapsWrapper: GoogleMapsAPIWrapper,
    _markerManager: MarkerManager) {
    window.scroll(0, 0);
  }


  ngOnInit(): void {

    // Custom scrollbar -
    this.mScrollbarService.initScrollbar(".hotel-list-card", {
      axis: "y",
      theme: "dark-thin",
      autoHideScrollbar: true,
      scrollInertia: 50
    });

    this.hotelService.getHotelDetails().subscribe(res => {
      this.hotelDetails = res.hotels;
      console.log(this.hotelDetails);
      
    })


    $(document).ready(function () {

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
    })

    //Google API Autocomplete
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


  //Set Location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // Get address function -
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        }
        else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
  }

  // Marker Click Event -
  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

}
