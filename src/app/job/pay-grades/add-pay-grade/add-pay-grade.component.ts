import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-add-pay-grade',
  templateUrl: './add-pay-grade.component.html',
  styleUrls: ['./add-pay-grade.component.css']
})
export class AddPayGradeComponent implements OnInit {
  payData: any = {};
  data;
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
  loading = false;
  isSuccess = false;
  isFailure = false;
  minimumLength;
  maximumLength;
  constructor(private http: Http, private router: Router, public service: UserService,  private blocation: Location, private pattern:PatternsService) {
    this.minimumLength = this.pattern.minName;
    this.maximumLength = this.pattern.maximumLength;
  }
  
// added form reset after success - sharmistha - 08-23-2019 - start
  addPay(addPayFrm:NgForm) {
   
    this.loading=true;
    this.service.addPaygrades(this.payData)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code == "200") {
          this.loading=false;
          this.isSuccess = true;
          addPayFrm.reset();

        }
        else {
          console.log(this.data.errorMessages);
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
// added form reset after success - sharmistha - 08-23-2019 - end

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  cancel(){
    this.blocation.back()
  }

  closePopup() {
    this.loading=false;
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

}
