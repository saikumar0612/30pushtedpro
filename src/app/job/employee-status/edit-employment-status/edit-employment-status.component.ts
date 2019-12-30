import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';
 
@Component({
  selector: 'app-edit-employment-status',
  templateUrl: './edit-employment-status.component.html',
  styleUrls: ['./edit-employment-status.component.css']
})
export class EditEmploymentStatusComponent implements OnInit {

  statusId;
  status;
  data;
  isSuccess = false;
  isFailure = false;
  statusInfo:any = {id:'',name:''};
  statusData:any = {};
  headers:any;
  options:any;
  loading;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  minLength;
  maxLength;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService, private blocation: Location, private pattern:PatternsService) {
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

  ngOnInit() {
    this.loading=true;
    this.route.paramMap.subscribe(
      param => {
        this.statusInfo.id = param.get('id');
      
      }
    );
   
    this.service.editEmpStatusID(this.statusInfo.id)
    .subscribe(response =>{
      this.status= response.json().data;
      this.loading=false;
      this.statusInfo =this.status;
    
    },
    error => {
      this.loading=false;
      console.log(error);
    }
  )
  }

  editStatus(){
    this.loading=true; 
    this.statusData.id = this.statusInfo.id;
    this.statusData.empStatus = this.statusInfo.name;
  
    this.service.editEmpStatus(this.statusData)
    .subscribe(response =>{
      this.status = response.json();
     
      if(this.status.statusCode.code == "200"){
        this.loading=false;
        this.isSuccess = true;
      }
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

}
