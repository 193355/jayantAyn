import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  searchFlightForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    window.scroll(0,0);
   }

  ngOnInit(): void { 

    this.searchFlightForm = this.formBuilder.group({
      pickup_vanue: ['', Validators.compose([Validators.required])],
      drop_vanue: ['', Validators.compose([Validators.required])],
      pickup_date_time: ['', Validators.compose([Validators.required])],
      drop_date_time: ['', Validators.compose([Validators.required])],
      passengers: ['', Validators.compose([Validators.required])]

    })
 
    $(document).ready(function () {
      $('.slider').slick({
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
  } 

  // onSearchFlight - 
  onSearchFlight(form) {
    this.isSubmitted = true;
    console.log("form data =", form);
  }

}
