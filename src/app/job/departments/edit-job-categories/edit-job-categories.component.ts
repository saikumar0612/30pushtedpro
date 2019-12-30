import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-job-categories',
  templateUrl: './edit-job-categories.component.html',
  styleUrls: ['./edit-job-categories.component.css']
})
export class EditJobCategoriesComponent implements OnInit {
  catId;
  data;
  loading = false;
  isSuccess = false;
  isFailure = false;
  catInfo: any = { id: '', name: '' };
  catData: any = {};
  headers: any;
  options: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  departmentmaxLength;
  minLength;
  // url:any = 'http://localhost/tedpros_services/';
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public service: UserService,private blocation: Location, private pattern:PatternsService) {
    this.departmentmaxLength = this.pattern.departmentNameLength;
    this.minLength = this.pattern.minName;
  }

  cancel(){
    this.blocation.back();
  }

  closePopup() {
    this.loading = true;
    this.isFailure = !this.isFailure;
    this.loading = false;
  }

  close() {
    this.loading = true;
    this.isSuccess = !this.isSuccess;
    this.loading = false;
  }
  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(
      param => {
        this.catInfo.id = param.get('id');
        console.log(this.catInfo.id);
      }
    );
    // this.http.get(this.url+'job/getcategory/?id='+this.catInfo.id,  this.options)
    this.service.getJobCategory(this.catInfo.id)
      .subscribe(response => {
        const data = response.json().data;
        this.catInfo = data[0];
        this.loading = false;
        // console.log(this.catInfo);
      },

        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }

  editCat() {
    this.loading = true;
    this.catData.id = this.catInfo.id;
    this.catData.jobName = this.catInfo.name;
    this.service.editJobCategories(this.catData)
      .subscribe(response => {
        this.data = response.json();
        this.loading = false;
        // console.log(this.cat);
        // if(this.cat === 'success'){
        //   this.router.navigate(['job-categories']);
        // }
        if (this.data.statusCode.code === '200') {
          this.loading = false;
          this.isSuccess = true;
        } else {
          console.log(this.data.errorMessages);
          this.loading = false;
          this.isFailure = true;
        }
      },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

}
