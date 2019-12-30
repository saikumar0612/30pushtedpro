import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.css']
})
export class PrerequisitesComponent implements OnInit {
  
  loading:boolean = false;
  filterData = [];
  availableRecords = 0;
  url;
  types:any=[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userPermissions: any;
	logger:any={};
  log:any={};
  
  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService, private router: Router,private eventEmitterService: EventEmitterService) {
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Prerequisite documents';
		this.logger.comment='Prerequisite documents';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
		this.log = response.json().data;   
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  ngOnInit() {
    this.userPermissions = this.currentUser.permission;
    this.getPrerequisiteDocs();
  }

  getPrerequisiteDocs(){
    this.loading = true;
    this.service.getPrerequisiteDocs().subscribe(res => {
      this.types = res.json().data;
      this.filterData = this.types;
      this.loading = false;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
    })
  }

  editTemplate(typeId){
    this.url = "/prerequisites/edit-prerequisite-doc/";
    this.router.navigateByUrl(this.url+typeId);
  }

  viewTemplate(typeId){
    this.url = "/prerequisites/view-prerequisite-doc/";
    this.router.navigateByUrl(this.url+typeId);
  }

  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.types;
    } else {

      if (key === 'name') {
        this.filterData = this.types.filter(x =>
          x.type.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }

}
