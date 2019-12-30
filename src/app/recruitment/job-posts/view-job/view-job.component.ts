import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  // change --suresh-- 08-05-2019 start
  jobInfo: any = {
    data: {
      company: '',
      contact: '',
      job: '',
      country: '',
      state: '',
      city: '',
      recruiter: '',
      perHour: {
        id: '',
        pay_frequency: ''
      },
      status: '',
      jobStatus: '',
      skill: {
        skillName: '',
        experience: ''
      },
      description: '',
      internalNotes: '',
      holdCount: 0,
      pipelineCount: 0,
      applications:{
        applicationCount:''
      }
    }
  };
  jobLog: any;
  // change --suresh-- 08-05-2019 end
  loading;
  headers: any;
  options: any;
  skillData = [];
  workAuth = [];
  id;
  errorStr = '';
  log;
  logger: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userFieldPermissions = this.currentUser.fieldPermission;
  isShowPopup = false;
  message = '';
  error = '';
  baseUrl = '';
  recruiterId;
  settings = {
    title: '',
  };
  candidates:any = [];
  jobApplications;
  companySettings = localStorage.getItem('settings');
  availableRecords = 0;
  candidateRec = {
    id: '',
    name: '',
    phoneNo: '',
    emailId: '',
    skills: '',
    status:''
  };
  filterData:any = [];
  finalData = [];
  candidatesList:any = {
    candidates:[],
    onholdcandidates:[],
    selectedcandidates:[],
    rejectedcandidates:[]
  };
  userPermissions: any;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private blocation: Location, private service: UserService, private eventEmitter: EventEmitterService) {
    this.loading = true;
    this.baseUrl = window.location.origin;
    this.recruiterId = this.currentUser.id;
    this.userPermissions = this.currentUser.permission;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'View Job Postings';
    this.logger.comment = 'View Job Postings by Id as' + this.id;
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.loading = false;
        this.eventEmitter.onRecentActivityRefresh();

      });
    // move the getting data to the ngOnit function 

  }
  // cancel() {
  //   this.router.navigate(['./jobs']);
  // }

  shareObj = {
    href: 'http://tedpros.com/jobs/jobdetails/SMLJB0015', // '2482481185144219',
    hashtag: '#' + this.settings.title
  };

  cancel() {
    this.blocation.back();
  }
  getpublishJob() {
    let publishJobData = {
      company: '', url: '', company_name: '', employmentType:'', recEmploymentType:'', industryType:''
    };

    this.service.getPublishJobData(this.id).subscribe(response => {
      const result = response.json();
      if (result.statusCode.code === '200') {
        publishJobData = response.json().data;
        if (publishJobData) {
          if (publishJobData.company === '') {
            publishJobData.url = this.baseUrl;
            this.settings = JSON.parse(localStorage.getItem('settings'));
            publishJobData.company_name = this.settings.title;
          }
          publishJobData.employmentType = publishJobData.recEmploymentType;
          publishJobData.industryType = this.jobInfo.data.company.industry.name;
          let res = {};
          this.service.remotePublishJob(publishJobData).subscribe(publishJob => {
            res = publishJob.json().data;
            if (publishJob.json().statusCode.code === '200') {
              this.service.updateJobStatus(this.id)
                .subscribe(res => {
                  const output = res.json();
                  if (output.statusCode.code === '200') {
                    this.isShowPopup = true;
                    this.error = null;
                    this.message = 'Job Published successfully';
                  }
                  else {
                    this.error = res.json().errorMessages;
                  }
                });

            } else {
              this.isShowPopup = true;
              this.error = publishJob.json().errorMessages;
              this.message = null;
            }
          },
            error => {
              console.log(error);
            }
          );

        } else {
          this.isShowPopup = true;
          this.error = 'No job found';
          this.message = null;
        }
      } else {
        this.errorStr = result.errorMessages;
      }
    },
      error => {
        console.log(error);
      });

  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    window.location.reload();
  }
  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.id = param.get('id');
      }
    );
    this.settings = JSON.parse(localStorage.getItem('settings'));
    // changes 08-05-2019 --suresh start
    this.loading = true;
    this.service.getjobDetails(this.id)
      .subscribe(response => {
        this.jobInfo = response.json();
        this.skillData = this.jobInfo.data.skill;
        this.workAuth = this.jobInfo.data.workAuthorisation;
        this.jobApplications  = this.jobInfo.data.applications;
        this.candidatesList = this.jobApplications;
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );

    this.service.getJobLog(this.id)
      .subscribe(response => {
        this.jobLog = response.json().data;

      },
        error => {
          console.log(error);
        }
      );

    // changes 08-05-2019 --suresh end

  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.finalData;
    } else {

      if (key === 'name') {
        this.filterData = this.finalData.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'emailId') {
        this.filterData = this.finalData.filter(x =>
          x.emailId.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'phoneNo') {
        this.filterData = this.finalData.filter(x =>
          x.phoneNo.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'status') {
        this.filterData = this.finalData.filter(x =>
          x.status.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'skills') {
        this.filterData = this.finalData.filter(x =>
          x.skills.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
