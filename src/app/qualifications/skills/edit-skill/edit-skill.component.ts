import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  loading;
  skillId;
  skill;
  data;
  skillInfo:any = {id:'',name:'',description:''};
  skillData:any = {};
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
  minlength;
  maxLength;
  minimumLength;
  maximumlength;
  // url:any = 'http://localhost/tedpros_services/';
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService, public location:Location, private pattern:PatternsService) {
    this.minlength = this.pattern.minName;
    this.maxLength = this.pattern.descriptionlength;
    this.minimumLength = this.pattern.minimumLength;
    this.maximumlength = this.pattern.maximumLength;
   }

  ngOnInit() {
    this.loading=true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.route.paramMap.subscribe(
      param => {
        this.skillInfo.id = param.get('id');
        // console.log(this.skillInfo.id);
      }
    );
    // this.http.get(this.url+'qualifications/getskills/?id='+this.skillInfo.id,  this.options)
    this.service.editSkillsId(this.skillInfo.id)
    .subscribe(response =>{
      this.data = response.json().data;
      this.loading=false;
      this.skillInfo = this.data;
      // console.log(this.skillInfo);
    },
    error => {
      this.loading =false;
      console.log(error);
    }
  )
  }
  
  cancel(){
    // this.router.navigate(['skills']);
    this.location.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  editSkill(){
    this.loading=true;
    this.skillData.id = this.skillInfo.id;
    this.skillData.qalName = this.skillInfo.name;
    this.skillData.qalDesc = this.skillInfo.description;
    // this.http.post(this.url+'qualifications/editSkills/', this.skillData,  this.options)
    this.service.editSkills(this.skillData)
    .subscribe(response =>{
      this.skill = response.json();
      // console.log(this.skill);
      // if(this.skill === 'success'){
      //   this.router.navigate(['skills']);
      // }
      if(this.skill.statusCode.code == "200"){
        this.loading=false;
        this.isSuccess = true;
      }
      else{
        // console.log(this.status.errorMessages);
        this.loading=false;
        this.isFailure = true;
      }
    },
    error => {
      this.loading =false;
      console.log(error);
    }
  )}
}
