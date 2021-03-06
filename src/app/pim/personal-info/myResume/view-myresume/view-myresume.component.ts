import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { UserService } from '../../../../core/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-myresume',
  templateUrl: './view-myresume.component.html',
  styleUrls: ['./view-myresume.component.css']
})
export class ViewMyresumeComponent implements OnInit {

  personalInfo;
  informationData: any = {};
  experienceData;
  educationData;
  skillsData;
  contactData: any = {
    city: { name: '' },
    state: { name: '' },
    country: {}
  }
  skillsinfo = [];
  skillname = [];
  skillrate = [];
  licenseData = [];

  loading;
  headers: any;
  options: any;
  id;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, private service: UserService, private blocation: Location) {
  }

  public captureScreen() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 158;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 10;
      pdf.addImage(contentDataURL, 'PNG', 25, position, imgWidth, imgHeight);
      pdf.save(this.informationData.firstName + ' ' + this.informationData.lastName + ' CV.pdf');
    });
  }

  // ADD CHART OPTIONS. 
  pieChartOptions = {
    responsive: true
  }

  pieChartLabels = this.skillname;

  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(74, 88, 188, 0.9)',
        'rgba(253, 46, 46, 0.9)',
        'rgba(4, 208, 1, 0.9)',
        'rgba(219, 42, 251, 0.9)',
        'rgba(3, 222, 202, 0.9)'
      ]
    }
  ]

  pieChartData: any = [
    {
      data: this.skillrate
    }
  ];

  onChartClick(event) {
    console.log(event);
  }


  ngOnInit() {
    // this.http.get('http://service.tedpros.com/personal/fullInfo', this.options)
    this.service.getPersonalFullInfo()
      .subscribe(response => {
        this.personalInfo = response.json().data;
        this.informationData = this.personalInfo.personalInformation;
        this.contactData = this.personalInfo.contactDetails;
        this.experienceData = this.personalInfo.experienceDetails;
        this.educationData = this.personalInfo.educationDetails;
        
        this.licenseData = this.personalInfo.licenseDetails; 
        this.licenseData.forEach((list) => {
          if (list.licenseId === '0' || list.licenseId === '') {
            list.name = list.certificate;
          } else if (list.licenseId !== '0' || list.licenseId !== '') {
            list.name = list.licensename;
          }
        });

        this.skillsData = this.personalInfo.skillDetails;
        this.skillsData.forEach((list) => {
          if (list.skillId === "0") {
            list.name = list.otherSkill;
          }
          else {
            list.name = list.name;
          }
        })
        this.contactData = this.personalInfo.contactDetails;

        console.log(this.personalInfo);

        this.skillsData.forEach((obj) => {
          this.skillsinfo.push({ 'y': obj.experience, 'name': obj.name });
          // console.log(this.skillsinfo);
          this.skillname.push(obj.name);
          this.skillrate.push(obj.experience);
        })

      },
        error => {
          console.log(error);
        }
      );
  }
  

  onNavigate(location) {
    this.router.navigate([location]);
  }

}
