import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  id;
  name: string;
  postId;
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private messageService: 
    MessageService,private spinner: NgxSpinnerService) {
    //register  
    this.registerForm = new FormGroup({
      fName: new FormControl(null, Validators.required),
      lName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confPass: new FormControl(null, Validators.required),
    })

    //login
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
    this.spinner.show()
  }

  get f() { return this.registerForm.controls; }
  get f2() { return this.loginForm.controls; }
  
  showSuccess() {
    debugger
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Message Content' 
     });
  }

  tost(){
    console.log('Authentication Failed');
    this.messageService.add({
       severity:'error',
       summary: 'authentication failed',
       detail: 'API Key URL is invalid'
    })
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' })
  }

//register form
  onSubmit() {
    debugger
    this.submitted = true;
    const formData  = new FormData();
    formData.append('fName',this.registerForm.get('fName').value),
    formData.append('lName',this.registerForm.get('lName').value),
    formData.append('email',this.registerForm.get('email').value),
    formData.append('password',this.registerForm.get('password').value),
    formData.append('confirmpass',this.registerForm.get('confirmpass').value)

    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.reset();
  }

  onLoginSubmit() {
    debugger
    if (this.loginForm.invalid) {
      return;
    }
    const headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer'
      })     
    const body = { name: 'sd' }
    this.http.post('https://jsonplaceholder.typicode.com/posts', body, { headers }).subscribe(data => {
      this.postId = data;
      console.log(data);
      this.loginForm.reset();
    })
  }  
}

