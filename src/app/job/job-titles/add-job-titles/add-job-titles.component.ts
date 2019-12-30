import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';
import { PatternsService } from '../../../core/services/patterns.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-job-titles',
  templateUrl: './add-job-titles.component.html',
  styleUrls: ['./add-job-titles.component.css']
})
export class AddJobTitlesComponent implements OnInit {
   jobData: any = {
    department:[],
    jobTitle:'',
    jobDesc:'',
    minimumEdu:''
   };
  data;
  departments;
  loading;
  isSuccess = false;
  isFailure = false;
  headers: any;
  options: any;
  Jobtitlepattern;
  // jobtitles= [];
  selJobtitle = [];
  jobtitleSettings = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  jobtitleLength;
  minLength;
  descriptionLength;
  internalNotesLength;
  minimumEducationLength;
  minimumLength;
  constructor(private http: Http, private router: Router, public service: UserService, private blocation: Location, public pattern: PatternsService) {
    this.Jobtitlepattern = this.pattern.jobTitlePattern;
    this.jobtitleLength = this.pattern.jobtitlelength;
    this.minLength = this.pattern.minName;
    this.descriptionLength = this.pattern.descriptionlength;
    this.internalNotesLength = this.pattern.internalNotesLength;
    this.minimumEducationLength = this.pattern.minimumEducationLength;
    this.minimumLength = this.pattern.minimumLength;
    this.jobtitleSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }
  

  addJob(addJobFrm: NgForm) {
    this.loading=true;
    console.log(this.jobData);
    this.service.addJobTitle(this.jobData)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code == "200") {
          addJobFrm.resetForm();
          this.isSuccess = true;
          this.loading=false;
        }
        else {
          console.log(this.data.errorMessages);
          this.isFailure = true;
          this.loading=false;
        }
      },
        error => {
          this.loading=false;
          console.log(error);
        }
      )
  }

  ngOnInit() {
    this.loading=true;
    this.service.getJobCategories()
      .subscribe(response => {
        this.departments = response.json().data;
        console.log(this.departments);
        this.loading = false;    
      },
        error => {
          this.loading=false;
          console.log(error);
        });
    

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

}
