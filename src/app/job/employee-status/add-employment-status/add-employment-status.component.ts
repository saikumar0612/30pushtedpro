import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService} from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-add-employment-status',
  templateUrl: './add-employment-status.component.html',
  styleUrls: ['./add-employment-status.component.css']
})
export class AddEmploymentStatusComponent implements OnInit {
  status;
  statusData={
    empStatus:''
  };
  isSuccess = false;
  isFailure = false;
  headers:any;
  options:any;
  loading;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  minLength;
  maxLength;
  constructor(private http: Http, private router: Router, public service:UserService,private blocation: Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
  }
  cancel(){
    this.blocation.back(); 
  }
  closePopup() {
    this.isFailure = !this.isFailure;
  }
  close() {
    this.isSuccess = !this.isSuccess;
  }
   //  saikumar 24/08/019 started here -->
addStatus(addJobFrm:NgForm){
  this.loading=true;
    this.service.addEmpStatus(this.statusData)
    .subscribe(response =>{
      this.status = response.json();
         
      if(this.status.statusCode.code == "200"){
        this.loading=false;
        addJobFrm.resetForm();
        this.isSuccess = true;
      }
       //  saikumar 24/08/019 ended here -->
      else{
        this.loading=false;
        this.isFailure = true;
      }
    },
    error => {
      this.loading=false;
      console.log(error);
    }
  )
  }
  ngOnInit() {
  }
}
