import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';

import { HotelsService } from '../shared/services/hotels.service';

import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

declare var $: any;

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {

  hotelDetails: any = [];

  // This is for pagination-
  itemsPerPage = 4;

  // google maps zoom level
  latitude: number;
  longitude: number;
  zoom: number;
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
  constructor(private hotelService: HotelsService,
    private mScrollbarService: MalihuScrollbarService,
    private mapsAPILoader: MapsAPILoader, private ngZone:
      NgZone) {
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

    //google api autocomplete
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

}
