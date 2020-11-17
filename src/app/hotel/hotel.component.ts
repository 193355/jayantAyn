import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// google map imports -
import { GoogleMapsAPIWrapper, InfoWindowManager, MapsAPILoader, MarkerManager } from '@agm/core';

import { ToastrService } from 'ngx-toastr'; 
import { HotelsService } from '../shared/services/hotels.service';

// Scrollbar import -
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {

  hotelDetails: any = [];
  hotelImages: any = [];
  images: any[];  
  
  // Default image -
  defaultImage: any = `../../assets/hotel/hotel_left_img.jpg`;

  // This is for pagination-
  itemsPerPage = 4;

  // google maps zoom level
  latitude: number;
  longitude: number;
  zoom: number = 0;
  address: string;
  private geoCoder;

  // This is for star rating -
  one_star_rating: number = 1;
  two_star_rating: number = 2;
  three_star_rating: number = 3;
  four_star_rating: number = 4;
  five_star_rating: number = 5;

  // Primeng gallery responsive end point - 
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  // Scrollbar Import -
  @ViewChild(PerfectScrollbarComponent, null) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, null) directiveRef?: PerfectScrollbarDirective;
  previous: any;

  constructor(
    private router: Router,
    private hotelService: HotelsService,
    private mScrollbarService: MalihuScrollbarService, 
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    _loader: MapsAPILoader,
    _infoWindowManager: InfoWindowManager,
    _el: ElementRef,
    _mapsWrapper: GoogleMapsAPIWrapper,
    _markerManager: MarkerManager,
    private spinner: NgxSpinnerService) {
    window.scroll(0, 0);
  }


  ngOnInit(): void {

    // Spinner code -
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);

    // Custom scrollbar -
    this.mScrollbarService.initScrollbar(".hotel-list-card", {
      axis: "y",
      theme: "dark-thin",
      autoHideScrollbar: true,
      scrollInertia: 50
    });

    // Horizontal list card -
    this.mScrollbarService.initScrollbar(".horizontal-list", {
      axis: "y",
      theme: "dark-thin",
      autoHideScrollbar: true,
      scrollInertia: 150
    });

    // pushing hotels into hotel array -
    this.hotelService.getHotelDetails().subscribe(res => {
      this.hotelDetails = res.hotels;  
      // Pushing images to the image array
      this.hotelDetails.forEach(hotel => { 
        hotel.images.forEach(image => {
          this.hotelImages.push(image);
        })
      })
      this.images = this.hotelImages;
    }) 

    // Jquery for slick carousel - 
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


  // Google map Set Location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // Google Map Get address function -
  getAddress(latitude, longitude) {
    console.log("latitude=",latitude);
    
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } },
      (results, status) => { 
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

  // Google Map Marker Click Event -
  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  // Google Map Mouse Hover Event -
  mouseOver(infowindow, hotel) {
    infowindow.open();
    this.previous = infowindow;
  }

  // Google Map Mouse Out Event -
  mouseOut(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  // Error function setting default image -
  changeSource(event){
    event.target.src = this.defaultImage;
  }

  // Getting single hotel object -
  passHotelID(hotel) { 
    this.router.navigate(['/hotel/view-deals' , hotel.id]); 
    
    // Success notification toastr -
    this.toastr.success('Switched to view deals page successfully');
  }

}
