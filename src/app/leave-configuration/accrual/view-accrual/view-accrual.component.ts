import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-accrual',
  templateUrl: './view-accrual.component.html',
  styleUrls: ['./view-accrual.component.css']
})
export class ViewAccrualComponent implements OnInit {

  showform = false;
  showlocation = false;
  showemployee = false;
  showhidepregnant;
  roles: any = {};
  branches;
  data;
  leavePeriod: any = [];
  userData:any = {
    employeeType: { id: '', name: '' },
    location: { id: '', name: '' },
    leaveType: { id: '', name: '' },
    accrualFrequency: { id: '', value: '' },
    accrualInterval: '',
    creditDate: '',
    creditingMonth: '',
    creditingDay: '',
    validFrom: { id: '', value: '' },
    firstAccrual: { id: '', value: '' },
    month:''
  };
  availableRecords = 0;
  id = '';
  monthName:any = [
    {
      "name": "January",
      "short": "Jan",
      "number": 1,
      "days": 31
    },
    {
      "name": "February",
      "short": "Feb",
      "number": 2,
      "days": 28
    },
    {
      "name": "March",
      "short": "Mar",
      "number": 3,
      "days": 31
    },
    {
      "name": "April",
      "short": "Apr",
      "number": 4,
      "days": 30
    },
    {
      "name": "May",
      "short": "May",
      "number": 5,
      "days": 31
    },
    {
      "name": "June",
      "short": "Jun",
      "number": 6,
      "days": 30
    },
    {
      "name": "July",
      "short": "Jul",
      "number": 7,
      "days": 31
    },
    {
      "name": "August",
      "short": "Aug",
      "number": 8,
      "days": 31
    },
    {
      "name": "September",
      "short": "Sep",
      "number": 9,
      "days": 30
    },
    {
      "name": "October",
      "short": "Oct",
      "number": 10,
      "days": 31
    },
    {
      "name": "November",
      "short": "Nov",
      "number": 11,
      "days": 30
    },
    {
      "name": "December",
      "short": "Dec",
      "number": 12,
      "days": 31
    }
  ];
  currentUser:any;
  constructor(private blocation: Location, private route: ActivatedRoute, private service: UserService) {
  }

  cancel() {
    this.blocation.back();
  }

  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.params.subscribe(res => {
      this.id = res.id;
    });
    console.log(this.monthName);
    this.service.getAccrualRule(this.id)
      .subscribe(res => {
        this.userData = res.json().data;
        const creditDate = this.userData.creditDate.split('/');
        this.userData.creditingMonth = creditDate[0];
        this.userData.creditingDay = creditDate[1];      
        this.monthName.forEach((type) => {
          if (type.number.toString() === this.userData.creditingMonth) {
            console.log(type);
            this.userData.month = type.name;
          }
        });
        console.log(this.userData);
      });
  }

}
