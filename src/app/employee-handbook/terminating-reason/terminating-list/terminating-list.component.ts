import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminating-list',
  templateUrl: './terminating-list.component.html',
  styleUrls: ['./terminating-list.component.css']
})
export class TerminatingListComponent implements OnInit {
  loading;
  termination=[];
  terminationData:any = {};
  terminationInfo:any={
    name:'',
    description:''
  }
  isShowPopup = false;
  filterData:any=[];
  availableRecords = 0;
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions:any;
	logger:any={};
  log:any={};

  constructor(public http:Http, private service:UserService,private eventEmitterService: EventEmitterService, private router:Router) {
    this.loading=true;
    this.service.getTerminationRules()
    .subscribe(response =>{
      this.termination = response.json().data;
      if(this.termination){
        this.filterData = this.termination;
        this.availableRecords = this.filterData.length;
      }
      
      this.loading=false;
      console.log(this.termination);
    })

    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Terminating reasons';
		this.logger.comment='Terminating reasons';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
		this.log = response.json().data;   
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
  }

  showJobDetails(reason){
    try{
      // this.http.get(' http://service.tedpros.com/termination/getTermination?id='+reason, this.options)
      this.service.getTermination(reason)
      .subscribe(response =>{
        this.terminationInfo = response.json().data;
      })
    }
    catch(error){
      // console.log(error);
    }
    this.isShowPopup = true;
  } 

  closePopup(){
    this.isShowPopup = !this.isShowPopup;
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.termination;
    } else {

      if (key === 'name') {
        this.filterData = this.termination.filter(x =>
          x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if(key === 'description') {
        this.filterData = this.termination.filter(x =>
          x.description.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }


}
