import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { PatternsService } from '../../../core/services/patterns.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  message;
  isShowPopup;

  cusData: any = {
    specialisation: {},
    address: {},
    social: {},
    vendorPersonal: [{}],
    logo: ''
  };
  customers;
  users;
  countries;
  states;
  cities;
  loading;
  display: boolean = false;
  industries;
  zipError = '';

  error = null;
  contacts: any = {};
  addressPattern;
  twitterPattern;
  facebookPattern;
  linkedInPattern;
  companyNamePattern;
  // patterns
  primaryPhonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailIdPattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,4}$)';
  finNoPattern = '^[0-9]{9}$';
  dunNoPattern = '^[0-9]{9}$';
  log;
  logger: any = {};

  headers: any;
  options: any;
  industriesData: any = {
    industryType: ''
  };
  companypopup;
  data;
  contactError: any = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userToken: string;
  uploaded = false;
  // check company name - sharmistha - 12-03-2019 - start
  companyData:any={
    companyName:'',
    companyType:''
  };
  result:any;
  duplicateNameError;
  checkData:any = {
    companyName:'',
    companyType:''
  };
  checkingdata;
  emailError;
  // check company name - sharmistha - 12-03-2019 - end

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  // contacts: Array<Contact>;
  constructor(private http: Http, private router: Router, public auth: AuthenticationService, public service: UserService, private blocation: Location, private eventEmitter: EventEmitterService, public pattern: PatternsService) {
    this.addressPattern = this.pattern.addressPattern;
    this.twitterPattern = this.pattern.twitterPattern;
    this.facebookPattern = this.pattern.facebbokPattern;
    this.linkedInPattern = this.pattern.linkedInPattern;
    this.companyNamePattern = this.pattern.companyNamePattern;
    this.userToken = this.currentUser.token;

    this.loading = true;
    this.logger.actionPath = this.router.url;
    this.logger.actionTitle = 'Add Vendor Company';
    this.logger.comment = 'Add new Vendor Company ';
    this.service.adduserLogs(this.logger)
      .subscribe(response => {
        this.log = response.json().data;
        this.eventEmitter.onRecentActivityRefresh();
      });

    this.service.getUsersList()
      .subscribe(response => {
        this.users = response.json();
        this.loading = false;
      },
        error => {
          console.log(error);
        });


    this.service.getCountries()
      .subscribe(response => {
        this.countries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });






    this.cusData.countryId = '231';
    this.change('231');
    this.uploader = new FileUploader({
      url: this.service.uploadClients(),
      itemAlias: 'client_logo',
      headers: [{ name: 'Token', value: this.userToken }]
    });
  }

  close() {
    this.uploaded = this.uploader.queue[0].isSuccess;
    this.cusData.logo = this.uploader.queue[0]._file.name;
    this.uploader.queue[0].isSuccess = !this.uploader.queue[0].isSuccess;
  }

  // get states list based on country id
  change(id) {
    this.service.getStates(id)
      .subscribe(response => {
        this.states = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }


  // get cities list based on state id
  state(id) {
    this.service.getCities(id)
      .subscribe(response => {
        this.cities = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }

  getAddress() {

    const zip = this.cusData.address.zipCode;
    this.zipError = null;
    if (zip !== null) {
      this.service.getAddress(zip)
        .subscribe(response => {
          const result = response.json();
          if (result.statusCode.code === '200') {
            this.cusData.countryId = result.data.country.id;
            this.cusData.address.countryId = result.data.country.id;
            this.change(this.cusData.address.countryId);
            this.cusData.address.stateId = result.data.state.id;
            this.state(this.cusData.address.stateId);
            this.cusData.address.cityId = result.data.city.id;
          } else {
            this.cusData.address.zipCode = '';
            this.zipError = 'Please enter a valid zip code';
          }
        },
          error => {
            console.log(error);
          });
    }

  }

  // saikumar 30/08/2019 started here
  addindustry(industryType, addindFrm: NgForm) {
    this.loading = false;
    if (industryType !== "") {
      this.contactError = '';
      this.industriesData.industryType = industryType;
      this.service.postIndustries(this.industriesData).subscribe(response => {
        this.data = response.json();

        if (this.data.statusCode.code === '200') {
          this.closecompPopup();
          addindFrm.resetForm();
        }
        else if (this.data.statusCode.code === '409') {
          this.contactError = this.data.errorMessages;
        }

        this.getindustries()
        this.cusData.industryType = this.data.data;

      });
    } else {
      this.loading = false;
      this.contactError = 'Fill required Fileds';

    }
  }

  // saikumar 30/08/2019 ended here

  addcomp() {
    this.companypopup = true;
  }

  getindustries() {
    // get industries list
    this.service.getIndustries()
      .subscribe(response => {
        this.industries = response.json().data;
        this.loading = false;
      },
        error => {
          console.log(error);
        });
  }


  closecompPopup() {
    this.companypopup = !this.companypopup;

  }
  //saikumar 21/08/2019 ended here


  addCom(addComFrm: NgForm) {
    this.loading = true;
    this.cusData.companyType = 'vendor';
    this.cusData.vendorPersonal = this.contacts;
    this.service.addCompany(this.cusData)
      .subscribe(response => {
        const resp = response.json();
        this.customers = resp.data;
        if (this.customers != null && resp.statusCode.code === '200') {
          this.loading = false;
          addComFrm.resetForm();
          this.message = resp.data;
          this.isShowPopup = true;
        }
        else {
          this.error = resp.errorMessages;
          this.loading = false;
          this.isShowPopup = true;
        }

      },
        error => {
          this.loading=false;
          console.log(error);
        });
  }
  closePopup() {
    this.isShowPopup = !this.isShowPopup;
    this.error = '';
    this.message = '';
    this.contactError = '';
  }
  setname(userid) {
    console.log('useris' + userid);

    console.log(this.contacts);
  }
  ngOnInit() {
    this.getindustries();
  }

  cancel() {
    this.blocation.back();
  }


  // adding new record in the table display
  userId: string;
  name: string;
  description: string;
  addContact(userId, name, description) {
    let contact = new Contact(userId, name, description);
    this.contacts.push(contact);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        this.contacts[this.contacts.length - 1].name = this.users[i].first_name;
      }
    }
  }

  removeContact(contact) {
    let index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }

  
  // check company name - sharmistha - 12-03-2019 - start
  checkClientName(){
    this.duplicateNameError = "";
    this.companyData.companyName = this.cusData.companyName;
    this.companyData.companyType = "vendor";  
    this.service.checkCompanyName(this.companyData)
    .subscribe(res => {
      this.result = res.json();
      if(this.result.statusCode.code === "200"){
        this.duplicateNameError = this.result.data;
      }
      else if(this.result.statusCode.code === "404"){
        this.duplicateNameError = "";
      }
      else{
        this.duplicateNameError = this.result.errorMessages;
      }
    })
  }
  // check company name - sharmistha - 12-03-2019 - end

  
  // check company email added by suresh -12-04-2014 start 
  checkCompanyEmail(){
    this.emailError = "";
    this.checkData.companyType = "vendor";  
    this.checkData.emailId = this.cusData.emailId;  
    this.service.checkCompanyEmail(this.checkData)
    .subscribe(res => {
      this.checkingdata = res.json();
      if(this.checkingdata.statusCode.code === "200"){
        this.emailError = this.checkingdata.data;
      }
      else if(this.checkingdata.statusCode.code === "404"){
        this.emailError = "";
      }
      else{
        this.emailError = this.checkingdata.errorMessages;
      }
    })
  }
  // check company email added by suresh -12-04-2014 start

}
//model class used to define a contact
export class Contact {

  userId: string;
  name: string;
  description: string;

  constructor(userId, name, description) {
    this.userId = userId;
    this.name = name;
    this.description = description;
  }

}