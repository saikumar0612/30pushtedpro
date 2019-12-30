import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-add-holidays',
  templateUrl: './add-holidays.component.html',
  styleUrls: ['./add-holidays.component.css']
})
export class AddHolidaysComponent implements OnInit {
  data: any;
  loading;
  isSuccess = false;
  isFailure = false;


  holidayData: any = {
    name: '',
    dateAdded: '',
    day: '',
    repeat: ''
  };
  minLength;
  maxLength;
  constructor(private blocation: Location, private service: UserService, private pattern:PatternsService) { 
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
  }



  ngOnInit() {
  }
  cancel() {
    this.blocation.back();
  }

  addHoliday(addHolidayFrm:NgForm) {
    this.loading=true;

    this.holidayData.dateAdded= new DatePipe('en-US').transform ( this.holidayData.dateAdded, 'yyyy-MM-dd');

    this.service.addholiday(this.holidayData)
      .subscribe(res => {
        console.log(res);
        this.data = res.json();
        this.loading=false;
        console.log(this.data);
        if (this.data.statusCode.code === '200') {
          addHolidayFrm.resetForm();
          this.loading=false;
          this.isSuccess = true;

        } else {
          this.loading=false;
          this.isFailure = true;

        }
      }
      //   error => {
      //     console.log(error);
      //   }

      );
  }



  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }
}
