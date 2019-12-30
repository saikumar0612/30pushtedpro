import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-leave-type',
  templateUrl: './edit-leave-type.component.html',
  styleUrls: ['./edit-leave-type.component.css']
})
export class EditLeaveTypeComponent implements OnInit {
  leaveInfo: any = {
     id: '',
     name: '',
     country:{
       id:'',
       name:''
     }
    
    };
  data;
  leaveData: any = {};
  leave;
  isShowPopup;
  isShowPopup1;
  error = null;
  message;
  countries;
  isSuccess = false;
  isFailure = false;
  loading;
  currentUser:any;
  minLength;
  maxLength;
  constructor(private route: ActivatedRoute, private service: UserService, private router: Router, private blocation: Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minimumLength;
    this.maxLength = this.pattern.maximumLength;
    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        // this.loading = false;
        // console.log(this.countries);
      },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading=true;
    this.route.paramMap.subscribe(
      param => {
        this.leaveInfo.id = param.get('id');
        console.log(this.leaveInfo.id);
      }
    );

    this.service.getLeaveTypeById(this.leaveInfo.id).subscribe(res => {
      this.data = res.json().data;
      this.loading=false;
      this.leaveInfo = this.data;
      console.log(this.leaveInfo);
    })
  }

  editLeave() {
    this.loading=true;
    console.log(this.leaveInfo);
    this.service.editLeaveType(this.leaveInfo.id, this.leaveInfo).subscribe(response => {
      console.log(response);
      this.leave = response.json();
      // console.log(this.leaveInfo);
      if (this.leave.statusCode.code === '200') {
        this.loading=false;
        this.isSuccess = true;
        // this.isShowPopup1 = true;
        // this.message = 'Type of Leave Edited sucessfully';
        // this.error = null;

      } else {
        this.loading=false;
        this.isFailure = true;
        // this.message = null;
        // this.error = this.data.errorMessages;
        // this.isShowPopup1 = true;
      }
    },
      error => {
        this.loading=false;
        console.log(error);
      });
  }

  popupMsg() {
    this.isShowPopup = true;
    this.isShowPopup1 = true; 
  }

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

  closePopup1() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  // closePopup1() {
  //   this.isShowPopup1 = !this.isShowPopup1;
  //   this.error = '';
  //   this.message = '';
  // }

  cancel() {
    this.blocation.back();
  }
}
