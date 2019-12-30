import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-edit-holidays',
  templateUrl: './edit-holidays.component.html',
  styleUrls: ['./edit-holidays.component.css']
})
export class EditHolidaysComponent implements OnInit {
  isSuccess = false;
  isFailure = false;

  data :any={}
  holidayData: any = {};
  holiday;
  loading;
  id:any;
  day:any;
  minLength;
  maxLength;
  constructor(private http: Http,private blocation: Location, private service: UserService,private route: ActivatedRoute, private router: Router, private pattern:PatternsService) {
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
   }



  ngOnInit() {
    this.loading=true;
    this.route.paramMap.subscribe(
      param => {
        this.day = param.get('id');
  
        console.log(this.day);
      }
    );
    this.service.getHolidayById(this.day).subscribe(res=>{
      this.holidayData = res.json().data;
      this.loading=false;
      console.log(this.holidayData);
    }
    // , error => {
    //   console.log(error);
    // }
    );
  }

  
  editHoliday(){
    this.loading=true;
    // console.log(this.data);
    this.holidayData.dateAdded = new DatePipe('en-US').transform ( this.holidayData.dateAdded, 'yyyy-MM-dd');
    this.service.editHoliday(this.day,this.holidayData).subscribe(res=>{
      console.log(res);
      this.holiday = res.json();
      this.loading=false;
      if (this.holiday.statusCode.code === '200') {
        this.loading=false;
        this.isSuccess= true;
      } else {
        this.loading=false;
        this.isFailure = true;
      }
    },
      error => {
        this.loading=false;
        console.log(error);
      });
  
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  };
  cancel() {
    this.blocation.back();
  }
}
