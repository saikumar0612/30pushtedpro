import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  loading;
  eduId;
  edu;
  data;  
  isSuccess = false;
  isFailure = false;
  eduInfo:any = {id:'',name:''};
  eduData:any = {};
  currentUser ={
    token:'',
    email:'',
    id: '',
    flag: '',
    empType: {
        id:'',
        employeeType: ''
    },
    userType: {
        id: '',
        name: '',
        typeName: ''
    },
    first_name: '',
    last_name: '',
    middle_name: '',
    isAdmin: false,
    Adminrole: false,
    permission: {},
    submenuPermission: { },
    fieldPermission: {}
  };
  minLength;
  maxlength;
  
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService, public location: Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minimumLength;
    this.maxlength = this.pattern.maximumLength;
   }

  ngOnInit() {
    this.loading=true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.paramMap.subscribe(
      param => {
        this.eduInfo.id = param.get('id');
      }
    );

    this.service.editEducationId(this.eduInfo.id)
    .subscribe(response =>{
      this.data= response.json().data;
      this.loading=false;
      this.eduInfo =this.data;
    },
    error => {
      this.loading=false;
      console.log(error);
    }
  )
  }

  editEdu(){
    this.loading=true;
    this.eduData.id = this.eduInfo.id;
    this.eduData.eduName = this.eduInfo.name;
    // this.http.post(this.url+'qualifications/editEducation/', this.eduData, this.options)
    this.service.editEducation(this.eduData)
    .subscribe(response =>{
      this.edu = response.json();
      if(this.edu.statusCode.code == "200"){
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
  cancel(){
    // this.router.navigate(['education']);
    this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }
}
