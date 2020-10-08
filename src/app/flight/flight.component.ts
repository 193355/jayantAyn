import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  searchFlightForm: FormGroup;
  isSubmitted: boolean;

  flightDetails: any = [];
  one_star_rating: number = 1;
  two_star_rating: number = 2;
  three_star_rating: number = 3;
  four_star_rating: number = 4;
  five_star_rating: number = 5;

  // Pagination -
  totalRecords = 0;
  rowsPerPageOptions;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    window.scroll(0, 0);
  }


  ngOnInit(): void {

    this.searchFlightForm = this.formBuilder.group({
      origin: ['', Validators.compose([Validators.required])],
      destination: ['', Validators.compose([Validators.required])],
      depart: ['', Validators.compose([Validators.required])]
    })

    this.http.get("https://fake-hotel-api.herokuapp.com/api/hotels").subscribe(res => {
      console.log("response =", res);
      this.flightDetails = res;
      this.totalRecords = this.flightDetails.length;
    })
  }

  // Search fligh - 
  onSearchFlight(flightForm) {
    this.isSubmitted = true;
    // flightForm.resetForm();
  }

}
