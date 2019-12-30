import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { PatternsService } from '../../../core/services/patterns.service';
 
@Component({
  selector: 'app-edit-licenses',
  templateUrl: './edit-licenses.component.html',
  styleUrls: ['./edit-licenses.component.css']
})
export class EditLicensesComponent implements OnInit {
  loading;
  licId;
  lic;
  data;
  licInfo:any = {id:'',name:''};
  licData:any = {};
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
    this.maxLength = this.pattern.maximumLength;
  }

  cancel(){
    // this.router.navigate(['licenses']);
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
        this.licInfo.id = param.get('id');
      }
    );
    this.service.getLicenceId(this.licInfo.id)
    .subscribe(response =>{
      this.data= response.json().data;
      this.loading=false;
      this.licInfo = this.data;
    },
    error => {
      console.log(error);
    }
  )
  }

  editlic(){
    this.loading=true;
    this.licData.id = this.licInfo.id;
    this.licData.lName = this.licInfo.name;
    this.service.editLicence(this.licData)
    .subscribe(response =>{
      this.lic = response.json();
      if(this.lic.statusCode.code == "200"){
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
    }
  )
  }

}
