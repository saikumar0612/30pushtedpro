import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-accrual',
  templateUrl: './edit-accrual.component.html',
  styleUrls: ['./edit-accrual.component.css']
})
export class EditAccrualComponent implements OnInit {
  loading;
  showform = false;
  showlocation = false;
  showemployee = false;
  showhidepregnant;
  roles: any ;
  branches;
  data;
  leavePeriod: any = [];
  userData = {
    employeeType: { id: '' },
    location: { id: '' },
    leaveType: { id: '' },
    accrualFrequency: { id: '' },
    accrualInterval: '',
    creditDate: '',
    creditingMonth: '',
    creditingDay: '',
    validFrom: { id: '' },
    firstAccrual: { id: '' }
  };
  leaveData;
  users;
  addLeaveError = '';
  isSuccess = false;
  isFailure = false;
  entitlementData: any;
  monthName = [
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
  days = [];
  filterData: any = [];
  availableRecords = 0;
  id = '';
  currentUser:any;
  constructor(private blocation: Location, private route: ActivatedRoute, private service: UserService) {

    for (let index = 1; index < 32; index++) {
      this.days.push(index);
    }

    // get roles list

    this.service.getEmployeeTypes()
      .subscribe(response => {
        // console.log(response);
        this.roles = response.json().data;
        console.log(this.roles);
        // this.loading = false;
      },
        error => {
          console.log(error);
        });

    // get leave type

    this.service.getLeaveType().subscribe(res => {
      this.data = res.json().data;
      console.log(this.data);
    });

    // get leave period

    this.service.getLeavePeriod()
      .subscribe(response => {
        this.leavePeriod = response.json().data;
        console.log(this.leavePeriod);
      });

    // get users list

    this.service.getUsersList().subscribe(res => {
      this.users = res.json();
      console.log(this.users);
    });
  }

  cancel() {
    this.blocation.back();
  }
  onchangemonth(month){
    this.days =[];
    const year=(new Date()).getFullYear()
    const daysinmonth = new Date(year, month, 0).getDate();
    for (let index = 1; index <= daysinmonth; index++) {
      this.days.push(index);
    }
  }


  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading=true;
    this.route.params.subscribe(res => {
      this.id = res.id;
    });
    this.service.getCompanyBranches()
      .subscribe(res => {
        this.branches = res.json().data;
        this.loading=false;
        //  console.log(this.branches);
      });
    this.service.getAccrualRule(this.id)
      .subscribe(res => {
        this.userData = res.json().data;
        this.loading=false;
        const creditDate = this.userData.creditDate.split('/');
        this.userData.creditingMonth = creditDate[0];
        this.userData.creditingDay = creditDate[1];
        console.log(this.userData.creditingDay);
        console.log(this.userData);
      });
  }

  editAccrual(editLeaveFrm: NgForm) {
    this.loading=true;
    this.userData.creditDate = this.userData.creditingMonth + '/' + this.userData.creditingDay;
    console.log(this.userData);
    this.service.editAccrualRule(this.userData)
      .subscribe(res => {
        console.log(res);
        this.leaveData = res.json();
        if (this.leaveData.statusCode.code === '200') {
          editLeaveFrm.resetForm();
          this.loading=false;
          this.isSuccess = true;

        } else {
          this.loading=false;
          this.isFailure = true;

        }
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  closePopup() {
    this.isFailure = !this.isFailure;
  }
  close() {
    this.isSuccess = !this.isSuccess;
  }

}
