import { Component, OnInit, DoCheck } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm }   from '@angular/forms';
import { Router } from "@angular/router";
import { Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';

@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.css']
})
export class AddKpiComponent implements OnInit, DoCheck {
  log
  logger:any={};
  rateerror;
  kpiData:any = {
    department:[],
    indicatorArray:[],
    jobTitle:[]
  };
  departments;
  kpi;
  data;
  selDept=[];
  selectedItems = [];
  loading;
  jobTitles;
  categoryTitles;
  title=[];
  dropdownSettings = {};
  jobTitlesDropdownSettings = {};
  headers:any;
  options:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  selectedJobTitles = [];
  catTitles;
  deSelectList;
  isSuccess;
  isFailure;
  error;
  kpiPattern;

  // private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  titleId: any;
  filterData=[];
  availableRecords: any;
  kpis: any;
  kpisForTitle: any;
  result=[];

  
  // url:any = 'http://localhost/tedpros_services/';
  constructor(private http: Http, private router: Router, public service:UserService, private blocation:Location,private eventEmitterService: EventEmitterService, private pattern:PatternsService) {
    this.kpiPattern = this.pattern.kpiIndicatorPattern;
    this.logger.actionPath=this.router.url;
    this.logger.actionTitle='Add kpi';
    this.logger.comment='Add kpi';
    this.service.adduserLogs(this.logger)
    .subscribe(response=>{
      this.log = response.json().data;
      // this.timerComponent.getusersactivity();
      // firstComponentFunction(){    
        this.eventEmitterService.onRecentActivityRefresh();    
      // }  
    });




  }

  ngOnInit() {
    this.loading=true;
    this.kpiData.minRating = "1";
    this.kpiData.type = "1";
    // get department list
    this.service.getJobCategories()
    .subscribe(response => {
      this.departments = response.json().data;
      this.loading = false;   
    },
    error => {
      this.loading = false;   
      console.log(error);
    });

    // get job titles
    // this.http.get(this.url+'job/categoryTitles', this.options)
    this.service.getJobCategoryTitle()
    .subscribe(response=>{
      this.categoryTitles = response.json().data;
      this.loading = false;
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": false
    };    

    this.kpiData.indicatorArray.push({
      indicator: '',
      minRating: "1",
      maxRating: '',
      defaultScale: '',
    });

    this.newAttribute = {
      indicator: '',
      minRating: "1",
      maxRating: '',
      defaultScale: '',
    };

  }

  ngDoCheck(){
    this.jobTitlesDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'jobTitle',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      "closeDropDownOnSelection": false
    }
  }

  onItemSelect(item: any) {
    this.catTitles = this.categoryTitles.filter(x=>{
      return x.id == item.id
    })[0];
    this.catTitles.jobTitle.forEach(obj=>{
      this.selectedJobTitles.push(obj);
      this.selectedJobTitles =  [...this.selectedJobTitles];
    })
  }

  // code change for department deselection - sharmistha - 09-18-2019 - start
  OnItemDeSelect(item: any){
    this.deSelectList = this.categoryTitles.filter(x=>{
      return x.id == item.id
    })[0];

    this.deSelectList.jobTitle.forEach((removeObj) => {
      this.selectedJobTitles.forEach((jobTitle, index)=>{
        if(removeObj.id == jobTitle.id){
          this.selectedJobTitles.splice(index, 1);
          this.selectedJobTitles =  [...this.selectedJobTitles];
        }
      })
      if(this.kpiData.jobTitle){
        this.kpiData.jobTitle.forEach((ele, index)=>{
          if(removeObj.id === ele.id){
            this.kpiData.jobTitle.splice(index, 1);
            this.kpiData.jobTitle =  [...this.kpiData.jobTitle];
            this.selectedJobTitles =  [...this.selectedJobTitles];
          }
        })
      }      
    })
  }
  // code change for department deselection - sharmistha - 09-18-2019 - end

  onDeSelectAll(item: any){
    this.selectedJobTitles = [];
    this.kpiData.jobTitle=[];
    this.selectedJobTitles =  [...this.selectedJobTitles];
  }
  

  onSelectAll(item: any){
    this.selectedJobTitles = [];
    this.categoryTitles.forEach(selCat=>{
      if(selCat.jobTitle){
        selCat.jobTitle.forEach(cItem =>{
          this.selectedJobTitles.push(cItem);
          this.selectedJobTitles =  [...this.selectedJobTitles];
        })
      }      
    })
  }

  cancel() {
    this.blocation.back(); 
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }

  close() {
    this.isSuccess = !this.isSuccess;
    this.reset();
  }

  addKpi(addJobFrm:NgForm){
    this.loading=true;
    if(this.rateerror){
      this.error = "Enter valid data before submitting"
    }
    else{
      // console.log(this.kpiData);
      this.service.addPerformanceIndicator(this.kpiData)
      .subscribe(response =>{
        this.data = response.json();
        if(this.data.statusCode.code == "200"){
          this.loading=false;
          this.isSuccess = true;
          addJobFrm.resetForm();
        }
        else{
          console.log(this.data.errorMessages);
          this.loading=false;
          this.isFailure = true;
        }
      },
      error => {
        this.loading=false;
        console.log(error);
      })
    }
  }
  
  checkrating(){
    if( (Number(this.kpiData.minRating == "0")) || (Number(this.kpiData.maxRating == "0")) ){
      this.rateerror = "Min and Max rating cannot be 0";
    }
    if((Number(this.kpiData.minRating)) > (Number(this.kpiData.maxRating))){
      this.rateerror="Max rating should be greater than Min rating";
    }
    else if((Number(this.kpiData.minRating)) == (Number(this.kpiData.maxRating))){
      this.rateerror="Max rating should be greater than Min rating";
    }
    else{
      this.rateerror="";
    }
  }

  reset(){
    this.kpiData.department = [];
    this.kpiData.jobTitle = [];
    this.kpiData.indicatorArray = [];
    this.newAttribute = {
      indicator: '',
      minRating: '1',
      maxRating: '',
      defaultScale: '',
    };
    this.kpiData.indicatorArray.push({
      indicator: '',
      minRating: '1',
      maxRating: '',
      defaultScale: '',
    });
    this.filterData = [];
    this.result = [];
  }

  // code for dynamically adding and deleting rows - sharmistha - 12-04-2019 - start
  addFieldValue() {
    console.log(this.newAttribute);
    this.kpiData.indicatorArray.push(this.newAttribute);
    console.log(this.kpiData.indicatorArray);
    this.newAttribute = {
      indicator: '',
      minRating: "1",
      maxRating: '',
      defaultScale: '',
    };
  }

  deleteFieldValue(index) {
    this.kpiData.indicatorArray.splice(index, 1);
  }
  // code for dynamically adding and deleting rows - sharmistha - 12-04-2019 - start

  // code for display kpis for selected jobtitle - sharmistha - 12-05-2019 - start
  onTitleSelect(item: any) {
    this.loading = true;
    this.service.getPerformanceKPI()
    .subscribe(response => {
      this.kpis = response.json().data;
      this.kpisForTitle = this.kpis.filter(x=>{
        return x.jobId == item.id
      });
      this.kpisForTitle.forEach(obj=>{
        this.result.push(obj);
        this.result =  [...this.result];
      });      
      this.filterData = this.result;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      this.loading = false;
    });
  }

  OnTitleDeSelect(item:any){
    this.loading = true;
    this.service.getPerformanceKPI()
    .subscribe(response => {
      this.kpis = response.json().data;
      this.kpisForTitle = this.kpis.filter(x=>{
        return x.jobId == item.id
      });

      this.kpisForTitle.forEach(removeobj=>{
        this.result.forEach((jobTitle, index) => {
          if(removeobj.jobId === jobTitle.jobId){
            this.result.splice(index, 1);
            this.result =  [...this.result];
          }
        });
        
      });      
      console.log(this.result);
      this.filterData = this.result;
      if(this.filterData){
        this.availableRecords = this.filterData.length;
      }
      this.loading = false;
    });
  }
  // code for display kpis for selected jobtitle - sharmistha - 12-05-2019 - start

  // search functionality - sharmistha - 12-05-2019 - start
  search(term: string, key: string) {
    if (!term) {
      this.filterData = this.result;
    }
    else{
      if (key === 'indicator') {
        this.filterData = this.result.filter(x =>
          x.indicator.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobTitleName') {
        this.filterData = this.result.filter(x =>
          x.jobTitle.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'department') {
        this.filterData = this.result.filter(x =>
          x.department.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'jobTitle') {
        this.filterData = this.result.filter(x =>
          x.jobTitle.name.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'minRating') {
        this.filterData = this.result.filter(x =>
          x.minRating.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } else if (key === 'maxRating') {
        this.filterData = this.result.filter(x =>
          x.maxRating.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      }
    }
    this.availableRecords = this.filterData.length;
  }
  // search functionality - sharmistha - 12-05-2019 - end

}
