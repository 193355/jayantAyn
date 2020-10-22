import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})

export class BusComponent implements OnInit {
  latitude: number;
  longitude: number;
  mapType: any;
  zoom: number;
  address: string;
  private geoCoder;
  public origin: any;
  public destination: any;
  public waypoints: any = [];
  public renderOptions = {
    draggable: true,
  }

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone:
    NgZone, private fb: FormBuilder, private formBuilder: FormBuilder) {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.getDirection();
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
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
  }

  //source to destination
  getDirection() {
    this.origin = {
      lat: 24.799448,
      lng: 120.979021
    };
    this.destination = {
      lat: 24.799524, lng: 120.975017
    };

    this.mapType = { mapType: "satelite" };

    //  this.origin = this.origin;
    //  this.destination = this.destination
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

}











