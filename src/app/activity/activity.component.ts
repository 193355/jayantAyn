import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  searchFlightForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    window.scroll(0,0);
  }

  ngOnInit(): void {

    this.searchFlightForm = this.formBuilder.group({
      destination: ['', Validators.compose([Validators.required])],
      pickup_date_time: ['', Validators.compose([Validators.required])],
      activity: ['', Validators.compose([Validators.required])],  
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

    // Search fligh - 
    onSearchFlight(flightForm) {
      console.log("form data =", flightForm.value);
      
      this.isSubmitted = true;
      // flightForm.resetForm();
    }

}
