import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.css']
})
export class JobTitlesComponent implements OnInit {
  private bodyText: string;
  jobs;
  filterData:any=[{
    department:{}
  }];
  userData:any = {};
  singleJob:any;
  isShowDetails:boolean = false;
  isShowPopup = false;
  availableRecords = 0;
  headers:any;
  options:any;
  loading = false;
  filteredTitle =[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
  
  // url:any = 'http://localhost/tedpros_services/';

  constructor(public http:Http, private router: Router, public service:UserService ) {
    this.userPermissions = this.currentUser.permission;
    console.log(this.userPermissions);
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.jobs;
    } else {

      if (key === 'job_title') {
        this.filterData = this.jobs.filter(x =>
          x.jobTitle.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'department') {
        this.filterData = this.jobs.filter(x =>
          x.department.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }else if (key === 'minimumEdu') {
        this.filterData = this.jobs.filter(x =>
          x.minimumEdu.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'job_description') {
        this.filteredTitle = this.jobs.filter(y => y.jobDescription != null);
        this.filterData = this.filteredTitle.filter(x =>
          x.jobDescription.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'note') {
        this.filteredTitle = this.jobs.filter(y => y.jobNote != null);
        this.filterData = this.filteredTitle.filter(x =>
          x.jobNote.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

  ngOnInit() {  
    this.loading = true;  
    // this.http.get('http://service.tedpros.com/job/title', this.options)
    this.service.getJobTitles()
      .subscribe(response =>{
        this.jobs = response.json().data;
        this.loading = false;  
        this.filterData = this.jobs;
        if( this.filterData){
        this.availableRecords = this.filterData.length;
        }
        this.loading=false;
        // console.log(this.jobs);
        if(response.json().statusCode.code === '403' || response.json().statusCode.code === '401'){
          this.loading=false;
          this.router.navigate(['/authorization/logout']);
        }
      },
      error => {
        this.loading=false;
        console.log(error);
      }
    )
  }

  showUserDetails(jobId){
    this.loading=true;
    this.singleJob = this.jobs.filter(x => x.id == jobId)[0];
    this.isShowPopup = true;
    this.loading=false;
    this.isShowDetails = true;
  }

  closePopup(){
    this.loading= true;
    this.isShowPopup = !this.isShowPopup;
    this.loading= false;
    this.isShowDetails = false;
  }
}
