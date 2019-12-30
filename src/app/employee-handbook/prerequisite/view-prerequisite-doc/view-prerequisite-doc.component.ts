import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { UserService} from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-prerequisite-doc',
  templateUrl: './view-prerequisite-doc.component.html',
  styleUrls: ['./view-prerequisite-doc.component.css']
})
export class ViewPrerequisiteDocComponent implements OnInit {
  typeId; 
  document = {
    id:'',
    type:'',
    template:''
  };
  loading:boolean=false;
	logger:any={};
  log:any={};

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService,private route: ActivatedRoute,private eventEmitterService: EventEmitterService, private router: Router) {
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='View prerequisite document';
		this.logger.comment='View prerequisite document';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
		this.log = response.json().data;   
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.typeId = param.get('id');
      }
    );

    this.viewDocument();
  }

  viewDocument(){
    this.loading = true;
    this.service.getPrerequisiteDocById(this.typeId)
      .subscribe(res => {
      this.document = res.json().data;
      this.loading = false;
      console.log(this.document);
    });
  }

  back(){
    this.location.back();
  }

}

