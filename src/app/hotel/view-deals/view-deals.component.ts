import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HotelsService } from '../../shared/services/hotels.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-view-deals',
  templateUrl: './view-deals.component.html',
  styleUrls: ['./view-deals.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ViewDealsComponent implements OnInit {
  id: any;
  hotelList: any = [];
  singleHotel: any = [];
  hotelImages: any = [];

  // Filter Array-
  searchHotelFilter: any;

  filterArray: any = [];
  first = 0;
  rows = 10;

  // Default image -
  defaultImage: any = `../../assets/hotel/hotel_left_img.jpg`;

  // Carousel image break point -
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


  constructor(private route: ActivatedRoute, private hotelService: HotelsService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.hotelService.getHotelDetails().subscribe(res => {
      this.hotelList = res.hotels;
      this.hotelList.filter((hotel: any) => {
        if (hotel.id == this.id) {
          this.CloneSingleHotel(hotel);
        }
      })
    })

    // Dummy Api for Price/Salary Filter -
    this.hotelService.getFilter().subscribe(res => {
      this.filterArray = res.data;
    })

  }


  // Range Filter Function -
  handleChange(event) {
    console.log('filter call=', event);
    // this.hotelService.getFilter().subscribe(res => {

    // })
  }

  // Pagination function for table -
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.filterArray ? this.first === (this.filterArray.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.filterArray ? this.first === 0 : true;
  }

  // Default image error function -
  changeSource(event) {
    event.target.src = this.defaultImage;
  }

  // Getting single hotel object- 
  CloneSingleHotel(hotel) {
    this.singleHotel.push(hotel);
    hotel.images.forEach(image => {
      this.hotelImages.push(image);
    });
  }

}
