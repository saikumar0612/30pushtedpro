import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-add-job-categories',
  templateUrl: './add-job-categories.component.html',
  styleUrls: ['./add-job-categories.component.css']
})
export class AddJobCategoriesComponent implements OnInit {
loading;
  catData: any = {
    jobName: ''
  };
  data;
  isSuccess = false;
  isFailure = false;
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string = this.currentUser.token;
  departmentmaxLength;
  minLength;
  constructor(private http: Http, private router: Router, public service: UserService, public blocation: Location, private pattern:PatternsService) {
    this.departmentmaxLength = this.pattern.departmentNameLength;
    this.minLength = this.pattern.minName;
  }
//  saikumar 24/08/019 started here -->
  addCat(addJobFrm:NgForm) {
    this.loading=true;
  
    this.service.addJobCategories(this.catData)
      .subscribe(response => {
        this.data = response.json();
        this.loading=false;
        if (this.data.statusCode.code === '200') {
          addJobFrm.resetForm();
          this.loading=false;
          //  saikumar 24/08/019 ended here -->
          this.isSuccess = true;
        } else {
          this.loading=false;
          console.log(this.data.errorMessages);
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
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }
  ngOnInit() {
    //console.log(this.currentUser);
  }

}
