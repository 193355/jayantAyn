import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  flightDetails: any = [];

  constructor(private http: HttpClient) {
    this.http.get("https://fake-hotel-api.herokuapp.com/api/hotels").subscribe(res => {
      console.log("response =", res);
    })
    window.scroll(0, 0);

  }


  ngOnInit(): void {

  }

}
