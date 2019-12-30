import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';
import { PatternsService } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css']
})
export class AddSkillsComponent implements OnInit {
  skillData: any = {};
  loading;
  skill;
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
  userPermissions : any;
  minlength;
  maxLength;
  minimumLength;
  maximumlength;
  constructor(private http: Http, private router: Router, private location: Location, public service: UserService, private pattern:PatternsService) {
    this.minlength = this.pattern.minName;
    this.maxLength = this.pattern.descriptionlength;
    this.minimumLength = this.pattern.minimumLength;
    this.maximumlength = this.pattern.maximumLength;
  }

  cancel() {
    this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  addSkill(addSkillFrm:NgForm) {
    this.loading= true;
    this.service.addSkills(this.skillData)
      .subscribe(response => {
        this.skill = response.json();
        if (this.skill.statusCode.code === '200') {
          addSkillFrm.resetForm();
          this.loading= false;
          this.isSuccess = true;
        } else {
          this.loading= false;
          this.isFailure = true;
        }
      },
        error => {
          this.loading= false;
          console.log(error);
        }
      );
  }
  ngOnInit() {
    this.loading= true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    this.loading= false;
  }

}
