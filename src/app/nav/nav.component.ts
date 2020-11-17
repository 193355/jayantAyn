import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, NgForm } from '@angular/forms';
import { MustMatch } from './pwd-validation/password-validator';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  registrationForm: FormGroup;
  registerFormArr: FormArray;

  loginForm: FormGroup;
  forgetPwdForm: FormGroup;

  isSubmitted: boolean;


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    // Registration form group -
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      // mobile: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      // Validators.minLength(10), Validators.maxLength(10)])],

      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      registerFormArr: this.formBuilder.array([this.createRegisterArray()]) // Form Array
    }, {
      validator: MustMatch('password', 'confirmPassword')
    },
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

  // Form Array Examples -
  createRegisterArray() {
    return this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    })
  }
  
  addNewFormArray() {
    this.registerFormArr = this.registrationForm.get('registerFormArr') as FormArray;
    this.registerFormArr.push(this.createRegisterArray());
    console.log('add form array', this.registerFormArr);
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
    if (this.loginForm.invalid) {
      // Error notification toastr -
      this.toastr.error('Something went wrong, Please check your form fields', 'Error', {
        timeOut: 3000,
      });
      return;
    }
    // Success notification toastr -
    this.toastr.success('Logged in successfully');
  }


  // Forget password submit event -
  onSubmitForgetPWD(form: NgForm) {
    this.isSubmitted = true;
    if (this.forgetPwdForm.invalid) {
      return;
    }

  }



}
