import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  searchFlightForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.searchFlightForm = this.formBuilder.group({
      pickup_location: ['', Validators.compose([Validators.required])],
      drop_location: ['', Validators.compose([Validators.required])],
      pickup_date_time: ['', Validators.compose([Validators.required])],
      drop_date_time: ['', Validators.compose([Validators.required])],
      passengers: ['', Validators.compose([Validators.required])]

    }) 
  }

  // Search fligh - 
  onSearchFlight(flightForm) {
    this.isSubmitted = true;
    // flightForm.resetForm();
  }

}
