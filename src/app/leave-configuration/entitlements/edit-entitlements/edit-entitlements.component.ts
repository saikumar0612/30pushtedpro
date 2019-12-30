import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-entitlements',
  templateUrl: './edit-entitlements.component.html',
  styleUrls: ['./edit-entitlements.component.css']
})
export class EditEntitlementsComponent implements OnInit {
  loading;
  showform: boolean = false;
  showlocation: boolean = false;
  showemployee: boolean = false;
  showhidepregnant: boolean;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];
  userData: any = {};
  leaveData;
  users;
  id;
  isSuccess = false;
  isFailure = false;
  entitlementsLength;
  currentUser:any;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private blocation: Location,private service: UserService, private pattern:PatternsService) {
      this.entitlementsLength = this.pattern.entitlementsDays;
    // get roles list

    this.service.getEmployeeTypes()
      .subscribe(response => {
        // console.log(response);
        this.roles = response.json().data;
        // console.log(this.roles);
        // this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get leave type

    this.service.getLeaveType().subscribe(res => {
      this.data = res.json().data;
      console.log(this.data);
    });

    // get leave period

    this.service.getLeavePeriod()
      .subscribe(response => {
        this.leavePeriod = response.json().data;
        // console.log(this.leavePeriod);
      });

    // get users list

    this.service.getUsersList().subscribe(res => {
      this.users = res.json();
      console.log(this.users);
    });

    // get barnches
    this.service.getCompanyBranches()
    .subscribe(res => {
      this.branches = res.json().data;
      //  console.log(this.branches);
    });
  }

  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading=true;
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
        console.log(this.id);
      }
    );
    this.service.getUserLeaveListById(this.id)
      .subscribe(res => {
        this.userData = res.json().data;
        this.loading=false;
        console.log(res.json());
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  onchange(id) {

    this.showform = true;
    if (id === '0') {
      this.showform = true;
      this.showemployee = true;
      this.showlocation = false;
    } else if (id === '1') {
      this.showform = true;
      this.showlocation = true;
      this.showemployee = false;
    }
  }

  cancel() {
    this.blocation.back();
  }


  addLeave() {
    this.loading=true;
    console.log(this.userData);
    this.service.editUserLeaves(this.userData)
      .subscribe(res => {
        this.leaveData = res.json();
        if (this.leaveData.statusCode.code === '200') {
          this.loading=false;
          this.isSuccess = true;

        } else {
          this.loading=false;
          this.isFailure = true;

        }
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }
  closePopup1(){
    this.isSuccess = !this.isSuccess;
  }

}
