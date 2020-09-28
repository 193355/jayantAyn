import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

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
  
}
