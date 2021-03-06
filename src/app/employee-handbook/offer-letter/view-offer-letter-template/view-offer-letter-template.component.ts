import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { UserService} from './../../../core/services/user.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-view-offer-letter-template',
  templateUrl: './view-offer-letter-template.component.html',
  styleUrls: ['./view-offer-letter-template.component.css']
})
export class ViewOfferLetterTemplateComponent implements OnInit {

  typeId; 
  offerLetter = {
    id:'',
    type:'',
    template:''
  };
  loading:boolean=false;
  logger:any={};
  log:any={};

  constructor(public http: Http,public location : Location ,private sanitizer: DomSanitizer,public service :UserService , public authenticationService:AuthenticationService,private route: ActivatedRoute, private router: Router,private eventEmitterService: EventEmitterService) {
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='View offer letter';
    this.logger.comment='View offer letter type';
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

    this.viewOfferLetter();
  }

  viewOfferLetter(){
    this.loading = true;
    this.service.getOfferLetterById(this.typeId)
      .subscribe(res => {
      this.offerLetter = res.json().data;
      this.loading = false;
      console.log(this.offerLetter);
    });
  }

  back(){
    this.location.back();
  }

}

