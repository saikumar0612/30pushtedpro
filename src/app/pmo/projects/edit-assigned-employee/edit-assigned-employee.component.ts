import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-assigned-employee',
  templateUrl: './edit-assigned-employee.component.html',
  styleUrls: ['./edit-assigned-employee.component.css']
})
export class EditAssignedEmployeeComponent implements OnInit {

  loading:boolean = false;
  project={
    id:''
  };
  projectId: string;
  projectInfo = {
    project:{
      projectName:''
    },
    users:[]
  };
  users = [];
  display:any;
  editEmpData = { userId: '', activityId: '', status: '' };
  projectData = {
    users:[],
    projectId:''
  }
  isShowPopup: boolean;
  message: boolean;
  error: boolean;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public auth: AuthenticationService, private location: Location, private service: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(
      param => {
        this.project.id = param.get('id');
        this.projectId = this.project.id;
      }
    );
    this.getAssignedEmployee(this.projectId);
    this.loading = false;
  }

  getAssignedEmployee(projectId){
    this.loading = true;
    this.service.getAssignedEmployeesofProject(projectId)
    .subscribe(response => {
      if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
        this.router.navigate(['']);
      }
      this.projectInfo = response.json().data;
      this.users = this.projectInfo.users;
      this.loading = false;
    },
    error => {
      console.log(error);
    });
  }

  editStatus(employee) {
    this.editEmpData.status = employee.status;
    const index = this.users.indexOf(employee);
    this.display = index;
  }

  editsinglestatus(editstatus, i) {
    this.users[i].status = editstatus;
  }

  cancel() {
    this.location.back();
  }

  closePopup(){
    this.getAssignedEmployee(this.projectId);
    this.isShowPopup = false;
    this.message = false;
    this.error = false;
  }

  editEmp(){
    this.loading = true;
    this.projectData.users = this.users;
    this.projectData.projectId = this.projectId;
    this.service.updateAssignedEmployees(this.projectData)
    .subscribe(response => {
      if (response.json().statusCode.code === '403' || response.json().statusCode.code === '401') {
        this.router.navigate(['']);
      }
      else{
        if(response.json().data)
        {
          this.projectInfo = response.json().data;
          this.loading = false;
          this.getAssignedEmployee(this.projectId);
          this.isShowPopup = true;
          this.message = true;
        }        
        else {
          this.getAssignedEmployee(this.projectId);
          this.isShowPopup = true;
          this.error = true;
        }
      }
    },
    error => {
      console.log(error);
    });
  }

}
