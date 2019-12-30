import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.css']
})
export class AssignProjectComponent implements OnInit {
  loading;
  error;
  message;
  isShowPopup;
  info;
  cusId;
  cus;
  projects: any = [];
  users;
  headers: any;
  options: any;
  customer: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  activitieslist: any;
  activityData: any = {};
  activityInfo: any = { project_id: '', name: '', activity_id: '' };
  assignInfo: any = {
    user: [],
    activityId: '',
    projectId: ''
  };
  dropdownSettings = {};
  noUserAssigned:boolean=false;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, private service: UserService, private titlecasePipe:TitleCasePipe) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  ngOnInit() {
    this.loading=true;
    this.service.getProject()
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.loading=false;
          this.router.navigate(['/authorization/logout']);
        }
        this.projects = response.json().data;
      },
      error => {
        this.loading=false;
        console.log(error);
      });
    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        this.loading=false;
        this.users.forEach(obj => {
          if(obj.jobTitle != null){
            obj.fullname = this.titlecasePipe.transform((obj.first_name + " " + obj.last_name) + " - " + obj.jobTitle.job_title);
          }
          else{
            obj.fullname = this.titlecasePipe.transform((obj.first_name + " " + obj.last_name));
          }
        });
      },
      error => {
        this.loading=false;
        console.log(error);
      });
  }
  activites(project) {
    this.service.getProjectActivity(project)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
        }
        this.activitieslist = response.json().data;
      },
      error => {
        console.log(error);
      });
  }

  assignProject(assignProjectFrm:NgForm) {
    this.loading = true;
    if(this.assignInfo.user.length === 0){
      this.noUserAssigned = true;
    }
    else{
      this.service.addAssignProject(this.assignInfo)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['/authorization/logout']);
        }
        this.info = response.json();
        if (this.info.statusCode.code === '200') {
          this.loading = false;
          this.message = this.info.data;
          this.isShowPopup = true;
          this.error = null;
          assignProjectFrm.resetForm();
        }
        else {
          this.loading = false;
          this.message = null;
          this.error = this.info.errorMessages;
          this.isShowPopup = true;
        }
      },
        error => {
          console.log(error);
        }
      );
    }    
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }

  cancel() {
    this.auth.cancel('projects');
  }

}
