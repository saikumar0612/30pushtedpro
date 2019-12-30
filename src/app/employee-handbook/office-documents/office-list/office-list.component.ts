import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../../core/services/event-emitter.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {
  doclist;
  loading;
  availableRecords:any;
  isShowPopup = false;
  officelist: any = [];
  holidayInfo: any = {};
  filterData: any;
  i9URL = '';
  documentlist: any = [];
  documents;
  isSuccess = false;
  isFailure = false;
  documentRec = {
    id:'',
    doc_type_id:'',
    document: '',
    title: '',
    name:''

  };
  singledocument:any={
    id:'',
    doc_type_id:'',
    document: '',
    title: ''   
  }
  docId:any;
  deletedoc;
  isShow =false;
	logger:any={};
  log:any={};
  
  constructor(private service: UserService,private router: Router,private eventEmitterService: EventEmitterService) {
    this.loading=true;
    this.i9URL = this.service.getBaseUrl() + '/frontend/officedocuments/';
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Official documents';
		this.logger.comment='Official document list';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
    this.log = response.json().data;   
    this.loading=false;
		this.eventEmitterService.onRecentActivityRefresh();    
		});
  }

  getOfficeList(){
    this.loading=true;
    this.service.getOfficeList()
    .subscribe(res=>{
      this.doclist = res.json().data;
      this.filterData = [];
      const documents = this.doclist;
      if(documents){
        for (let i = 0; i < documents.length; i++) {
          if (documents[i].id != null) {
            this.documentRec.id = documents[i].id;
          }
          else{
            this.documentRec.id= ' ';
          }
          if (documents[i].doc_type_id != null) {
            this.documentRec.doc_type_id = documents[i].doc_type_id;
          }else{
            this.documentRec.doc_type_id =' ';
          }
          if (documents[i].doc_type_id.name != null) {
            this.documentRec.name = documents[i].doc_type_id.name;
          }else{
            this.documentRec.doc_type_id =' ';
          }
  
          if (documents[i].document != null) {
            this.documentRec.document = documents[i].document;
          } else {
            this.documentRec.document = ' ';
          }
          if (documents[i].title != null) {
            this.documentRec.title = documents[i].title;           
          } else {
            this.documentRec.title = ' ';
          }
          
  
          this.officelist.push(this.documentRec);
          this.documentRec = {
            id:'',
            doc_type_id:'',
            document: '',
            title: '',
            name:''          
          };
        }
      }
      this.loading=false;
      // console.log(this.officelist);
      this.filterData = this.officelist;
      // console.log(this.filterData);
      this.availableRecords = this.filterData.length;
    },
      error => {
        this.loading=false;
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getOfficeList();
  }

  search(term: string, key: string) {
    if (!term) {
    this.filterData = this.officelist;
    } else {

    if (key === 'name') {
      this.filterData = this.officelist.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    else if (key === 'document') {
      this.filterData = this.officelist.filter(x =>
        x.document.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }
    else if (key === 'title') {
      this.filterData = this.officelist.filter(x =>
        x.title.trim().toLowerCase().includes(term.trim().toLowerCase()),
      );
    }

    }
    this.availableRecords = this.filterData.length;
  }

details(id){
  this.singledocument = this.filterData.filter(x => x.id == id)[0];
  this.isShowPopup = true;
}

closePopup(){
  this.isShowPopup = !this.isShowPopup;
  // this.isShowDetails = false;
}
deletePage(id){
  this.docId = id;
  this.isShow = true;
}

cancel(){
  this.isShow = !this.isShow;
}

  // delete i9 document
  delete(id) {
    this.service.deleteOfficeList(id)
    .subscribe(response => {
      // console.log(response);
      this.deletedoc = response.json();
      if (this.deletedoc.statusCode.code === '200') {
         // saikumar 01/08/2019 changes started here
    
        this.isShow = false;
  
        this.officelist = [];
        this.getOfficeList();
          // saikumar 01/08/2019 changes ended here
      
      } else {
        console.log(this.deletedoc.errorMessages);
      }
    },
    error => {
      console.log(error);
    });
  }







}
