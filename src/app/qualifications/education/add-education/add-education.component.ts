import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from 'src/app/core/services';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {
  loading;
  edu;
  eduData = {
    eduName:''
  };
  isSuccess = false;
  isFailure = false;
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

  constructor(private http: Http, private router: Router, public service: UserService, public location: Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minimumLength;
    this.maxlength = this.pattern.maximumLength;
  }

  addEdu(addEduFrm:NgForm) {
    this.loading=true;
    // console.log(this.eduData);
    this.service.addEducation(this.eduData)
      .subscribe(response => {
        this.edu = response.json();
        if (this.edu.statusCode.code === '200') {
          addEduFrm.resetForm();
          this.loading=false;
          this.isSuccess = true;
        } else {
          console.log(this.edu.errorMessages);
          this.loading=false;
          this.isFailure = true;
        }
      },
        error => {
          this.loading=false;
          console.log(error);
        }
      );
  }

  cancel() {
    // this.router.navigate(['education']);
    this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
