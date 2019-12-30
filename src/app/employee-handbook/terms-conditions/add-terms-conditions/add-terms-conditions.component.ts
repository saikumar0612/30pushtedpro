import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../../core/services';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-terms-conditions',
  templateUrl: './add-terms-conditions.component.html',
  styleUrls: ['./add-terms-conditions.component.css']
})
export class AddTermsConditionsComponent implements OnInit {
  loading;
  ckeConfig: any;
  mycontent: string;
  @ViewChild('myckeditor', { static: true }) ckeditor: any;
  data: any = {
    content: '',
    status: ''
  }
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
  userPermissions:any;
	logger:any={};
  log:any={};

  constructor(public http: Http, public service: UserService, private router: Router,private eventEmitterService: EventEmitterService) {
    this.data.status = '1';
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Add Terms & Conditions';
		this.logger.comment='Add Terms & Conditions';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
		this.log = response.json().data;   
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermissions = this.currentUser.permission;
  }

  close(){
    this.isSuccess = false;
  }

  closePopup(){
    this.isFailure = false;    
  }

  addTerms() {
    this.loading=true;
    this.service.addTermsConditions(this.data)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code === '200') {
          this.loading=false;
          this.isSuccess = true;
        }
        else {
          this.loading=false;
          this.isFailure = true;
        }
      },
        error => {
          this.loading=false;
          console.log(error);
        })
  }

}