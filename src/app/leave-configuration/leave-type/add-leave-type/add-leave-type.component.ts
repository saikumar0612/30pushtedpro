import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.css']
})
export class AddLeaveTypeComponent implements OnInit {
  leaveData: any = {};
  isShowPopup;
  data: any;
  countries;
  isShowPopup1;
  message;
  loading;
  error = null;
  currentUser:any;
  minLength;
  maxLength;
  constructor(private blocation: Location, private service: UserService, private pattern:PatternsService) {
    // this.loading = true;
    this.minLength = this.pattern.minimumLength;
    this.maxLength = this.pattern.maximumLength;
  }

  ngOnInit() {
    this.loading=true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
        // console.log(this.countries);
      },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

  popupMsg() {
    this.isShowPopup = true;
  }

  cancel() {
    this.blocation.back();
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

// saikumar 27/08/2019 started here
  addLeave(addLeaveFrm:NgForm) {
    this.loading=true;
    console.log(this.leaveData);
    // this.loading=true;
    this.service.addLeaveType(this.leaveData).subscribe(res => {
      console.log(res);
      this.data = res.json();
      console.log(this.data);
      if (this.data.statusCode.code === '200') {
        addLeaveFrm.resetForm();

        
// saikumar 27/08/2019 ended here
        this.loading=false;
        this.isShowPopup1 = true;
        this.message = 'Leave type added successfully';
        this.error = null;

      } else {
        this.loading=false;
        this.message = null;
        this.error = this.data.errorMessages;
        this.isShowPopup1 = true;
        // this.error = 'Please Enter Required Fields';
      }
    },
      error => {
        this.loading = false;
        console.log(error);
      });
  }

  closePopup1() {
    this.isShowPopup1 = !this.isShowPopup1;
    this.error = '';
    this.message = '';
  }
}
