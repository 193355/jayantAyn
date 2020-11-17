import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../nav/pwd-validation/password-validator';


declare var $: any;
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit, AfterViewChecked {
  searchFlightForm: FormGroup;
  isSubmitted: boolean;
  activeIndex: number = 1;

  registrationForm: FormGroup;
  registerFormArr: FormArray;

  loginForm: FormGroup;
  forgetPwdForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private toastr: ToastrService,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    window.scroll(0, 0);
  }

  ngOnInit(): void {

    this.searchFlightForm = this.formBuilder.group({
      origin: ['', Validators.compose([Validators.required])],
      destination: ['', Validators.compose([Validators.required])],
      depart: ['', Validators.compose([Validators.required])],
    })

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

  }

  // Change detection - 
  ngAfterViewChecked() {
    this.changeDetectionRef.detectChanges();
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

  removeArr(index) {
    this.registerFormArr.removeAt(index)
  }

  // Registration submit event
  onRegisterSubmit(form) {
    this.isSubmitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    console.log("form data =", this.registrationForm.value);
  }

  // Search fligh - 
  onSearchFlight(flightForm) {
    this.isSubmitted = true;
    // flightForm.resetForm();
  }

}
