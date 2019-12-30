import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-termination',
  templateUrl: './add-termination.component.html',
  styleUrls: ['./add-termination.component.css']
})
export class AddTerminationComponent implements OnInit {
  loading;
  reason:any;
  addingData:any = { name:'',description:''};
  headers:any;
  options:any;
  isSuccess = false;
  isFailure = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
	logger:any={};
  log:any={};
  minLength;
  maxLength;
  descriptionLength;
  constructor(private http:Http, private router:Router, private blocation:Location, private service:UserService,private eventEmitterService: EventEmitterService, private pattern:PatternsService) { 
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
    this.descriptionLength = this.pattern.descriptionlength;

    this.loading=true;
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Add termination reason';
		this.logger.comment='Add termination reason';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
    this.log = response.json().data; 
    this.loading=false;  
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  ngOnInit() {
  }

  cancel() {
    // this.router.navigate(['terminating-resons']);
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  addReason(addReasonFrm:NgForm){
    this.loading=true;
    // this.http.post('http://service.tedpros.com/termination/addTermination',this.addingData,this.options)
    this.service.addTerminationReson(this.addingData)
    .subscribe(response=>{
      this.reason=response.json();
      // console.log(this.reason);
      // if(this.reason.statusCode.code === '200'){
      //   this.router.navigate(['terminating-resons']);
      // }
      if (this.reason.statusCode.code === '200') {
        this.loading=false;
        this.isSuccess = true;
        addReasonFrm.resetForm();
      } else {
        this.loading=false;
        this.isFailure = true;
      }
    }
    );
    }
  }


