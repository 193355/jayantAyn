import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  selectedCountry: String = "--Choose Country--";
  Countries: Array<any> = [
		{ name: 'Germany', states: [ {name: 'A', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']} ] },
		{ name: 'Spain', states: [ {name: 'B', cities: ['Barcelona']} ] },
		{ name: 'USA', states: [ {name: 'C', cities: ['Downers Grove']} ] },
		{ name: 'Mexico', states: [ {name: 'D', cities: ['Puebla']} ] },
		{ name: 'India', states: [ {name: 'E', cities: ['Delhi', 'Kolkata', 'Mumbai', 'Bangalore']} ] },
  ];
  
  states: Array<any>;

  cities: Array<any>;

  // list: any = ['1', '2', '3']

  constructor() { 
    window.scroll(0,0);
  }

  ngOnInit(): void {
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

//change country
changeCountry(country) {
  debugger
  this.states = this.Countries.find(cntry => cntry.name == country).states;
}

changeState(state) {
  debugger
  this.cities = this.Countries.find(cntry => cntry.name == this.selectedCountry).states.find(stat => stat.name == state).cities;
}


}
