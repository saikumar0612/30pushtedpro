import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.css']
})
export class EditLanguageComponent implements OnInit {
  loading;
  lanId;
  lan;
  data;
  lanInfo:any = {id:'',name:''};
  lanData:any = {};
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
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service:UserService, public location:Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maxName;
  }

  cancel(){
    // this.router.navigate(['languages']);
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
        this.lanInfo.id = param.get('id');
      }
    );

    this.service.getLanguagesId(this.lanInfo.id)
    .subscribe(response =>{
      this.data= response.json().data;
      this.loading=false;
      this.lanInfo =this.data;
      
    },
    error => {
      this.loading=false;
      console.log(error);
    }
  )
  }

  editLan(){
    this.loading=true;
    this.lanData.id = this.lanInfo.id;
    this.lanData.langName = this.lanInfo.name;
    this.service.editLanguage(this.lanData)
    .subscribe(response =>{
      this.lan = response.json();
      if(this.lan.statusCode.code == "200"){
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
