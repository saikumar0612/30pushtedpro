import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  cusId;
  cus;
  cusInfo: any = { projectId: '', projectName: '', projectDesc: '', isApproved: '', startDate: '', endDate: '',customer:{name:''},internalApprover:{firstName:'',lastName:''},externalApprover:{first_name:'',last_name:''},activities :[], assignedEmployees:[]};
  cusData: any = {};
  headers: any;
  options: any;
  customer: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  activitieslist = [];
  activityData: any = {};
  activityInfo: any = { project_id: '', name: '', activity_id: '' };
  loading:boolean= false;
  assignedEmployees=[];

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, private blocation: Location, private service: UserService) {
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    this.service.getCompanyList()
      .subscribe(response => {
        this.customer = response.json();
        // console.log(this.customer);
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.loading=true;
    this.route.paramMap.subscribe(
      param => {
        this.cusInfo.id = param.get('id');
        this.activityInfo.project_id = this.cusInfo.id;
      }
    );
    this.service.getProjectId(this.cusInfo.id)
      .subscribe(response => {
        if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
          this.router.navigate(['']);
        }
        else if(response.json().statusCode.code === '200'){
          this.cusInfo = response.json().data;
          this.loading = false;
          // this.cusInfo.assignedEmployees.forEach(obj => {
          //   if(obj.activities != null){
          //     this.assignedEmployees.push(obj);
          //   }
          // });
          this.cusInfo.assignedEmployees.map(per => {
            if(per.activities != null){
              this.assignedEmployees.push(per);
            }            
          });
        }
        
      },
      error => {
        console.log(error);
      });
  }
  cancel() {
    this.blocation.back();
  }

}
