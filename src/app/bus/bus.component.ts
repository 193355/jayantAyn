import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  searchFlightForm: FormGroup;
  isSubmitted: boolean;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    window.scroll(0,0);
  }

  ngOnInit(): void {

    this.searchFlightForm = this.formBuilder.group({
      origin: ['', Validators.compose([Validators.required])],
      destination: ['', Validators.compose([Validators.required])],
      depart: ['', Validators.compose([Validators.required])],  
    }) 

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
    this.isSubmitted = true;
    // flightForm.resetForm();
  }

}
