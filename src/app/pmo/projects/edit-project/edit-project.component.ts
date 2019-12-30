import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { UserService } from '../../../core/services/user.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { PatternsService } from 'src/app/core/services/patterns.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  loading;
  activityError:any;
  indexofActivity;
  message;
  isShowPopup;
  dateError = '';
  display: any;
  cusId;
  cus;
  cusInfo: any = {
    projectId: '', customerId: '', customer: { id: '', name: '' }, projectName: '',
    projectDesc: '', isApproved: '', startDate: '', endDate: '', externalApprover: { id: '' }
  };
  cusData: any = {};
  headers: any;
  options: any;
  customer: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  activitieslist = [];
  editActivitylist = [];
  activityData: any = { id: '', name: '' };
  activityInfo: any = { id: '', name: '' };
  error = '';
  projectBoolean = false;
  internalApprovers = [];
  externalApprovers = [];
  companyError = '';
  approversAvailable = 0;
  minLength;
  maxLength;
  descriptionLength;
  activityMinLength;
  activityMaxLength;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, private patternService:PatternsService,
    private service: UserService) {
    this.minLength = this.patternService.minimumLength;
    this.maxLength = this.patternService.maximumLength;
    this.descriptionLength = this.patternService.descriptionlength;
    this.activityMinLength = this.patternService.minName;
    this.activityMaxLength = this.patternService.maxName;
    this.externalApprovers = [];
    this.service.getCompanyList()
      .subscribe(response => {
        this.customer = response.json().data;
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['']);
          this.customer = response.json().data;
        } else {
          // this.userData.roles = [];
          this.error = this.customer.errorMessages;
          this.isShowPopup = false;
        }
      },
        error => {
          console.log(error);
        });
    this.getInternalApprover();
  }

  ngOnInit() {
    this.loading=true;
    this.route.paramMap.subscribe(
      param => {
        this.cusInfo.projectId = param.get('id');
      }
    );
    // this.http.get('http://service.tedpros.com/project/getproject/?id=' + this.cusInfo.id, this.options)
    this.service.getProjectId(this.cusInfo.projectId)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['']);
        }
        this.cusInfo = response.json().data;
        this.loading=false;

        if (response.json().statusCode.code === '200' && this.cusInfo.customerId !== '') {
          this.loading=false;
          // this.trackerData.startDate =new Date(this.trackerData.startDate);
          this.cusInfo.startDate = new Date(this.cusInfo.startDate);
          this.cusInfo.endDate = new Date(this.cusInfo.endDate);
          this.cusInfo.customerId = this.cusInfo.customer.id;
          this.cusInfo.internalApprover = this.cusInfo.internalApprover.userId;
          this.cusInfo.externalApprover = this.cusInfo.externalApprover.id;
          this.getExternalApprover(this.cusInfo.customerId);
        }
        if (this.cusInfo.activities) {
          this.loading=false;
          this.activitieslist = this.cusInfo.activities;
        } else {
          this.loading=false;
          this.activitieslist = [];
        }

      },
        error => {
          this.loading=false;
          console.log(error);
        });
  }

  dateValidate() {
    if (this.cusInfo.endDate < this.cusInfo.startDate) {
      this.dateError = 'Please select a valid end date';
      this.cusInfo.endDate = this.cusInfo.startDate;
    } else {
      this.dateError = '';
    }

  }

  getInternalApprover() {
    this.loading=true;
    this.service.getUsersList()
      .subscribe(response => {
        this.internalApprovers = response.json();
      },
        error => {
          this.loading=false;
          console.log(error);
        });
  }

  getExternalApprover(companyId) {
    this.loading=true;
    if (companyId === '') {
      this.loading=false;
      this.externalApprovers = [];
      this.companyError = 'Please select company first';
    } else {
      this.loading=false;
      this.companyError = '';
      this.service.getApproversList(companyId)
        .subscribe(response => {
          const result = response.json();
          if (result.statusCode.code === '200') {
            this.loading=false;
            this.externalApprovers = result.data;
            this.approversAvailable = this.externalApprovers.length;
            // console.log(this.externalApprovers);
          } else {
            this.loading=false;
            this.externalApprovers = [];
          }
          // console.log(this.users);
        },
          error => {
            this.loading=false;
            console.log(error);
          });
    }
  }

  insertActivity(id, name, editActivityFrm: NgForm) {
    this.activityError="";
    if (this.indexofActivity != null || this.indexofActivity == 0 || this.indexofActivity != undefined) {
      let invalid = false;
      for (let index = 0; index < this.activitieslist.length; index++) {
        if (index != this.indexofActivity) {
          if (this.activitieslist[index].name === name ) {
            invalid = true;
          }
        }
      }
          if (invalid) {
            this.activityError = 'Duplicate activity  cannot be added';
          }
          else{

          const actData = { id: '', name: '' };
          actData.id = id;
          actData.name = name;

          this.activitieslist.splice(this.indexofActivity, 1, actData)
          editActivityFrm.resetForm();
          this.indexofActivity = null;
         }

      } else if (this.indexofActivity == null) {
        let invalid = false;
        for (let index = 0; index < this.activitieslist.length; index++) {
          if (this.activitieslist[index].name === name ) {
            invalid = true;
          }
        }
        if (invalid) {
          this.activityError = 'Duplicate activity cannot be added';
        }
        else{
        if (name.trim() === '' || name.trim() === null) {
          this.error = 'Activity name cannot be blank';
        } else {
          this.error = '';
          const actData = { id: '', name: '' };
          actData.id = id;
          actData.name = name;
          this.activitieslist.push(actData);
          editActivityFrm.reset();

        }
      }
    }
  }

  deleteActivity(activity){
    const index = this.activitieslist.indexOf(activity);
    this.activitieslist.splice(index, 1);
  }

  editPro() {
    this.loading=true;
    // console.log(this.cusInfo);
    this.cusInfo.activities = this.activitieslist;
    // this.http.post('http://service.tedpros.com/project/edit/', this.cusInfo, this.options)
    this.service.editProject(this.cusInfo)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.loading=false;
          this.router.navigate(['']);
        }
        this.cus = response.json();
        if (this.cus.statusCode.code === '200') {
          // this.router.navigate(['projects']);
          this.message = this.cus.data;
          this.loading=false;
          this.isShowPopup = true;
        } else {
          this.loading=false;
          this.isShowPopup = true;
          this.error = this.cus.errorMessages;
        }
      },
        error => {
          this.loading=false;
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
  }


  cancel() {
    this.auth.cancel('projects');
  }
  editActivity(jsonAry) {
    if (jsonAry.name === '' || jsonAry.name === null) {
      this.error = 'Activity name cannot be blank';
    } else {
      this.error = '';
      let index = this.activitieslist.indexOf(jsonAry);
      this.activityData.name = jsonAry.name;
      this.activityData.id = jsonAry.id;
      this.indexofActivity = index;
    }
  }
  editsingleactivity(activityName, i) {
    this.activitieslist[i].name = activityName;
  }


}
