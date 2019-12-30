import { Component, OnInit } from '@angular/core';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  loading
  jobList;
  data;
  userData:any = {
    jobId:'',
    email_id:''
  };
  isSuccess:boolean = false;
  isFailure;
  isSuccess1:boolean = false;
  isFailure1;
  code;
  singleData;
  filterData;
  userId;
  jobsList = [];
  single =[];
  skills;
  wishData:any = {}; 
  result;
  candidateUser :any;
  candidateEmail:string;
  check: boolean;
  availableRecords = 0;
  availableSearchRecords = 0;
  candidateId;
  jobRec:any = {
    code:'',
    employment_type:'',
    tech_title:'',
    external_bill_rate:'',
    description:'',
    skills:'',
    targetDate:'',
    applyStatus:''
  };
  matchingJobs: any = [];
  resultJobs:any;
  searchData;
  searchJob:any = {name:''};
  showresultJobs:boolean=false;
  showsearchData:boolean=false;
  noData:boolean=false;
  constructor(private service:VmsCandidateService, private http:Http) {
  }
 
  ngOnInit() {
    this.candidateUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.candidateEmail = this.candidateUser.data.email;
    this.candidateId=this.candidateUser.data.id;
    //matching jobs list - sharmistha - 08-01-2019 - start    
    this.getmatchingJobs();
    
  this.jobSearch(name);
//matching jobs list - sharmistha - 08-01-2019 - end
   
  }

getmatchingJobs()
{
  this.matchingJobs = [];
  this.service.getJobList().subscribe(res=>{
    this.jobList = res.json().data; 
    console.log(this.jobList);
    // this.jobList.forEach(obj => {
    //   if(obj != null){
    //     this.check =false;
    //     obj.forEach(job => {
    //       this.jobsList.push(job);
    //       // console.log(this.jobList);
    //     })
    //   }
    //   else{
    //     this.check=true;
    //   }
    // });
    console.log(this.jobList);     
    
    if(this.jobList){
      for (let i = 0; i < this.jobList.length; i++) {
        for (let j = i + 1; j < this.jobList.length;) {
          if (this.jobList[j].code == this.jobList[i].code) {
            for (let k = j; k < this.jobList.length; k++) {
              this.jobList[k] = this.jobList[k + 1];
            }
            this.jobList.length--;
          }
          else {
            j++;
          }
        }
      }
      this.filterData = this.jobList;
      console.log(this.filterData);
      // this.availableRecords = this.filterData.length;
      const jobsData = this.filterData;
      console.log(jobsData);
      for (let i = 0; i < jobsData.length; i++) {
        this.jobRec.code = jobsData[i].code;
        this.jobRec.applyStatus = jobsData[i].applyStatus;
        if (jobsData[i].employment_type !== null) {
          this.jobRec.employment_type = jobsData[i].employment_type;
        } else {
          this.jobRec.employment_type = ' ';
        }
        if (jobsData[i].tech_title !== null) {
          this.jobRec.tech_title = jobsData[i].tech_title;
        } else {
          this.jobRec.tech_title = ' ';
        }
        if (jobsData[i].external_bill_rate !== null) {
          this.jobRec.external_bill_rate = jobsData[i].external_bill_rate;
        } else {
          this.jobRec.external_bill_rate = ' ';
        }
        if (jobsData[i].description !== null) {
          this.jobRec.description = jobsData[i].description;
        } else {
          this.jobRec.description = ' ';
        }
        if (jobsData[i].skills) {
          let skillList = '';
          jobsData[i].skills.forEach((type) => {
            skillList = type.skillName + ', ' + skillList;
          });
          this.jobRec.skills = skillList;
        } else {
          this.jobRec.skills = ' ';
        }
        if (jobsData[i].targetDate !== null) {
          this.jobRec.targetDate = jobsData[i].targetDate;
        } else {
          this.jobRec.targetDate = ' ';
        }


        this.matchingJobs.push(this.jobRec);

        this.jobRec = {
          code:'',
          employment_type:'',
          tech_title:'',
          external_bill_rate:'',
          description:'',
          skills:'',
          targetDate:'',
          applyStatus:''
        }
      }
      this.resultJobs = this.matchingJobs;
      this.showresultJobs=true;
      this.availableRecords = this.resultJobs.length;
      console.log(this.resultJobs);
    }
});
this.loading=false
}


search(term: string, key: string) {
  if (!term) {
    this.resultJobs = this.matchingJobs;
  } else {

     if (key === 'tech_title') {
        this.resultJobs = this.matchingJobs.filter(x =>
          x.tech_title.trim().toLowerCase().includes(term.trim().toLowerCase()),
        );
      } 
  }
  this.availableRecords = this.resultJobs.length;
}


  jobApply(jobId){
    console.log(jobId);
    this.userData.jobId = jobId;
    this.userData.email = this.candidateEmail;
    this.userData.candidateId = this.candidateId;
    this.service.jobApply(this.userData).subscribe(res=>{
      this.data = res.json();
     
      if (this.data.statusCode.code === '200') {
        this.isSuccess = true;
        this.getmatchingJobs();
      } else {
        this.isFailure = true;
      }

    }); 
  };

  addtoWishList(code){
    console.log(code);
    this.wishData.jobId = code;
    this.wishData.email = this.candidateEmail;
    this.wishData.candidateId = this.candidateId;
    console.log(this.wishData);
    this.service.addWishList(this.wishData).subscribe(res=>{
      this.result = res.json();
      if (this.result.statusCode.code === '200') {
        this.isSuccess1 = true;
       
      } else if(this.result.statusCode.code === '409') {
        this.isFailure1 = true;
      }
    });
  }


  closePopup() {
    this.isFailure = !this.isFailure;
    this.getmatchingJobs();
  }
  closePopup1(){
    this.isFailure1 = !this.isFailure1;
  }

  
  close1() {
    this.isSuccess1 = !this.isSuccess1;
  }
  jobSearch(name){
        if(name){
        this.searchJob.name = name;
        this.service.jobsearch(this.searchJob.name).subscribe(res=>{
          this.searchData = res.json().data; 
          console.log(this.searchData);
          if(this.searchData != null){
            this.availableSearchRecords = this.searchData.length;
              this.showresultJobs=false;
              this.showsearchData=true ;

          }else{
            this.noData=true;
          }
          
      });
    }else{
      this.showresultJobs=true;
    }
    
}

close() {
  this.loading=true;
  this.getmatchingJobs();
  this.isSuccess = false;
  
}

}
