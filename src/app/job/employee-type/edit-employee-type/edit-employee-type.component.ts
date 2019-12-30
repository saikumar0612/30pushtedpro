import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-employee-type',
  templateUrl: './edit-employee-type.component.html',
  styleUrls: ['./edit-employee-type.component.css']
})
export class EditEmployeeTypeComponent implements OnInit {

  typeId;
  data;
  statusInfo: any = {};
  isSuccess = false;
  isFailure = false;
  headers: any;
  options: any;
  loading;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  minLength;
  maxLength;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service: UserService, private blocation: Location, private pattern:PatternsService) {
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
  }

  cancel() {
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(
      param => {
        this.statusInfo.id = param.get('id');
        this.typeId = this.statusInfo.id;
      }
    );
    this.service.getEmployeeType(this.typeId)
      .subscribe(response => {
        this.data = response.json().data;
        this.loading = false;
        this.statusInfo = this.data;
       
      },
        error => {
          this.loading = false;
          console.log(error);
        }
      )
  }
  editType() {
    this.loading = true;
    this.service.editEmployeeType(this.typeId, this.statusInfo)
      .subscribe(response => {
        this.data = response.json();
        if (this.data.statusCode.code === '200') {
          this.loading = false;
          this.isSuccess = true;
        } else {
          // console.log(this.data.errorMessages);
          this.loading = false;
          this.isFailure = true;
        }
      },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }

}

