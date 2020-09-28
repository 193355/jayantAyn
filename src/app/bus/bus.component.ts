import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  
  constructor() { 
    window.scroll(0,0);
  }

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
  });
  }

}
