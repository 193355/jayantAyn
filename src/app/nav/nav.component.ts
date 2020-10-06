import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  regId;
  registerForm: FormGroup;
  submitted = false;
    constructor(private http: HttpClient,private fb: FormBuilder) { 
      this.registerForm = this.fb.group({
        fName: ['', Validators.required],
        lName :['', Validators.required],
        email :['', [Validators.required,Validators.email]],
        password:['', [Validators.required,Validators.minLength(6)]],
        confPassword :['', Validators.required],
     })

     this.registerForm = new FormGroup({
      'fName': new FormControl(null),
      'lName': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'confPass': new FormControl(null),
     })
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

get f() { return this.registerForm.controls; }

onSubmit() {
  debugger
  this.submitted = true;
  debugger
  console.log(this.registerForm.value)
  }
}

