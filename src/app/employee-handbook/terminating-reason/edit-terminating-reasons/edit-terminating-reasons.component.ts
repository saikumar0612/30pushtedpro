import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';  
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-edit-terminating-reasons',
  templateUrl: './edit-terminating-reasons.component.html',
  styleUrls: ['./edit-terminating-reasons.component.css']
})
export class EditTerminatingReasonsComponent implements OnInit {
  loading;
  terminatingID;
  termination;
  reason;
  terminationInfo:any = {id:'',name:'',description:''};
  terminationData:any ={};
  isSuccess = false;
  isFailure = false;
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
	logger:any={};
  log:any={};
  minLength;
  maxLength;
  descriptionLength;
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public  blocation:Location, private service:UserService,private eventEmitterService: EventEmitterService, private pattern:PatternsService) {
    this.minLength = this.pattern.minName;
    this.maxLength = this.pattern.maximumLength;
    this.descriptionLength = this.pattern.descriptionlength;
    
    this.loading=true;
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Edit termination reason';
		this.logger.comment='Edit termination reason';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
    this.log = response.json().data;   
    this.loading=false;
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

   ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.terminatingID = param.get('id');
        // console.log(this.terminatingID);
      }
    );
    // this.http.get(' http://service.tedpros.com/termination/getTermination?id='+this.terminatingID,this.options)
    this.service.getTermination(this.terminatingID)
    .subscribe(response =>{
      this.terminationInfo= response.json().data;
      // console.log(this.terminationInfo);
    });
  }
  
  cancel(){
    // this.router.navigate(['terminating-resons']);
    this.blocation.back();
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
  }

  editReason(){
    this.loading=true;
    this.terminationData.id = this.terminationInfo.id;
    this.terminationData.name = this.terminationInfo.name;
    this.terminationData.description = this.terminationInfo.description;
    // this.http.post('http://service.tedpros.com/termination/editTermination',this.terminationData,this.options)
    this.service.editTerminationReson(this.terminationData)
    .subscribe(response =>{
      this.reason = response.json();
      // console.log(this.reason);
      if(this.reason.statusCode.code == "200"){
        this.loading=false;
        this.isSuccess = true;
      }
      else{
        this.loading=false;
        this.isFailure = true;
      }
    }
  )
  };

}
