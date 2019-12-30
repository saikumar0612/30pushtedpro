import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../../core/services';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edti-terms-conditions',
  templateUrl: './edti-terms-conditions.component.html',
  styleUrls: ['./edti-terms-conditions.component.css']
})
export class EdtiTermsConditionsComponent implements OnInit {
  ckeConfig: any;
  mycontent: string;
  @ViewChild("myckeditor", { static: true }) ckeditor: any;
  data: any = {
    content:'',
    id:'',
    status:''
  };
  content: any = {};
  result: any = {};
  isSuccess = false;
  isFailure = false;
  loading = false;
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
  userPermissions:any;
	logger:any={};
  log:any={};

  constructor(public http: Http, public service: UserService, private router: Router,private eventEmitterService: EventEmitterService) {
    this.data.status = '1';
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Edit Terms & Conditions';
		this.logger.comment='Edit Terms & Conditions';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
		this.log = response.json().data;   
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  close(){
    this.isSuccess = false;
  }

  closePopup(){
    this.isFailure = false;    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
    this.loading = true;
    //get terms & conditions
    this.service.getTermsConditions()
    .subscribe(response => {
      this.data = response.json().data;
      // console.log(this.data);
      this.loading = false;
    },
    error => {
      console.log(error);
    })
  }
  
  //edit contents
  editTerms(){
    this.loading=true;
    this.service.editTermsConditions(this.data)
    .subscribe(response => {
      this.result = response.json();
      if(this.result.statusCode.code == "200"){
        this.loading=false;
        this.isSuccess = true;
      }
      else{
        this.loading=false;
        this.isFailure = true;
      }
    },
    error => {
      console.log(error);
    })
  }

}
