import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  regId;
  form: FormGroup
    constructor(private http: HttpClient) { 
      // this.form = this.fb.group({
      //   fname :[''],
      //   lname :[''],
      //   email :[''],
      //   password : [''],
      //   confpassword :[''],
      // })
    }
    
  ngOnInit() {

  }

Addreg(){
  return this.http.post('https://jayantp-3b4e1.firebaseio.com/data.json',{
    "Name": "jason",
    "Value" :"123"
  }).subscribe(dt => {
    this.regId = dt
    console.log(this.Addreg); 
  })
}

submitForm() {
  console.log(this.form.value)
}

}
