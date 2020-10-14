import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})


export class LandingComponent implements OnInit {
  hotels: any= [];
  form: FormGroup;
  constructor(private spinner: NgxSpinnerService,private fb: FormBuilder,private http: HttpClient)  { }
  
  ngOnInit() { 
    this.getHotels();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    
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

      $(document).ready(function(){
        $("#forgetpassbtn").click(function(){
          $("#loginmodale").hide();
          $("#forgetpass").show();
        });
      });
    });
  }


  getHotels(){
    return this.http.get("https://fake-hotel-api.herokuapp.com/api/hotels")
    .subscribe(data =>{
          this.hotels = data;
          console.log(this.hotels); 
    })
  }
  

}
