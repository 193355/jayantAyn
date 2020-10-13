import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { MustMatch } from './pwd-validation/password-validator';

declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  registrationForm: FormGroup;
  loginForm: FormGroup;
  forgetPwdForm: FormGroup;

  isSubmitted: boolean; 


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    // Registration form group -
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])], 
     
      // mobile: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      // Validators.minLength(10), Validators.maxLength(10)])],

      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    )

    // Login form group
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })


    // Forget password form group -
    this.forgetPwdForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
    })

  }

  // Toggle Login & Forget Password Modal
  onToggleLogin() {
    $('#login').modal('hide');

    setTimeout(() => {
      $('#forgetmodal').modal('show');
    }, 100);
  }


  // Registration submit event
  onRegisterSubmit(form) {
    this.isSubmitted = true;
    if (this.registrationForm.invalid) { 
      return;
    }
    console.log("form data =", this.registrationForm.value);
    this.resetForm();
  }

  // Reset Form Function -
  resetForm() {
    this.isSubmitted = false;
    this.registrationForm.reset();
  }


  // Login submit event -
  onLoginForm(form: NgForm) {
    this.isSubmitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    console.log('login form data =', this.loginForm.value); 
  }


  // Forget password submit event -
  onSubmitForgetPWD(form: NgForm) {
    this.isSubmitted = true;
    if(this.forgetPwdForm.invalid) {
      return;
    }
    console.log('forget pwd form data = ', form.value);
    
  }



}
