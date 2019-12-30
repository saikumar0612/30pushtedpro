import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { PatternsService  } from '../../../core/services/patterns.service';
@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.css']
})
export class EditMembershipComponent implements OnInit {
  loading;
  memId;
  mem;
  memInfo:any = {id:'',name:''};
  memData:any = {};
  isSuccess = false;
  isFailure = false;
  // sharmistha - 08-01-2019 - start
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
  // sharmistha - 08-01-2019 - end
  minLength;
  maxLength;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private service:UserService, public location:Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
  }

  cancel(){
    // this.router.navigate(['memberships']);
    // sharmistha - 08-01-2019 - start
    this.location.back();
    // sharmistha - 08-01-2019 - end
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  ngOnInit() {
    this.loading=true;
    // sharmistha - 08-01-2019 - start
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // sharmistha - 08-01-2019 - end
    this.route.paramMap.subscribe(
      param => {
        this.memInfo.id = param.get('id');
      }
    );
    this.service.getMembershipsId(this.memInfo.id)
    .subscribe(response =>{
      let data= response.json().data;
      this.loading=false;
      this.memInfo =data;
    },
    error => {
      this.loading=false;
      console.log(error);
    }
  )
  }

  editMem(){
    this.loading=true;
    this.memData.id = this.memInfo.id;
    this.memData.memName = this.memInfo.name;
    this.service.editMembership(this.memData)
    .subscribe(response =>{
      this.mem = response.json();
      if(this.mem.statusCode.code == "200"){
        this.loading=false;
        this.isSuccess = true;
      }
      else{
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
}
