import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService } from '../../../core/services';
import { CandidateLoginRegisterComponent } from './candidate-login-register.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceStub } from 'src/app/mocks/AuthServiceStub';
import { ActivatedRouteStub } from 'src/app/mocks/ActivatedRouteStub';
import { Location } from '@angular/common';
import { LocationStub } from 'src/app/mocks/LocationStub';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { VmsServiceStub } from 'src/app/mocks/VmsServiceStub';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
import { EventEmittorStub } from 'src/app/mocks/EventEmittorStub';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule, MultiSelectComponent } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';
import { ChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ngx-image-cropper';

describe('CandidateLoginRegisterComponent', () => {
  let component: CandidateLoginRegisterComponent;
  let fixture: ComponentFixture<CandidateLoginRegisterComponent>;
  const AuthService = new AuthServiceStub();
  const locationStub = new LocationStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateLoginRegisterComponent],
      providers: [
        { provide: AuthenticationService, useValue: AuthService },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,

        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        RouterTestingModule, DataTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateLoginRegisterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    localStorage.setItem('settings', JSON.stringify({
      statusCode: {
        code: '200',
        message: 'ok'
      },
      errorMessages: null,
      data: {
        themeColor: '#E74C3C',
        siteFav: 'bafavicon.png',
        siteLogo: 'logo.png',
        themeClass: 'color6',
        title: 'BASolutions'
      }
    }));
    localStorage.setItem('candidateUserData', JSON.stringify({
      statusCode: {
          code: "200",
          message: "ok"
      },
      errorMessages: null,
      data: {
          "id": "64",
          "isNew": "2",
          "firstName": "Michael",
          "lastName": "M",
          "email": "smlogics2@gmail.com",
          "phoneNo": "+987-5438765473",
          "addressLine1": "Alaska",
          "addressLine2": "",
          "zipCode": "53226",
          "per": "1",
          "expectedPay": "226",
          "country": {
              "id": "231",
              "name": "United States"
          },
          "state": {
              "id": "3977",
              "name": "Wisconsin"
          },
          "city": {
              "id": "46965",
              "name": "Milwaukee"
          },
          "education": [
              {
                  "instituteName": "Latrobe university",
                  "qualification": "Masters",
                  "specialization": "CSE",
                  "passingYear": "2015",
                  "gpaScore": "3"
              },
              {
                  "instituteName": "BITS",
                  "qualification": "Doctorate",
                  "specialization": "CSE",
                  "passingYear": "2013",
                  "gpaScore": "0"
              },
              {
                  "instituteName": "Gayatri",
                  "qualification": "Bachelors",
                  "specialization": "computers",
                  "passingYear": "2013",
                  "gpaScore": "0"
              },
              {
                  "instituteName": "BITS",
                  "qualification": "Bachelors",
                  "specialization": "Electronics",
                  "passingYear": "2011",
                  "gpaScore": "0"
              },
              {
                  "instituteName": "Latrobe university",
                  "qualification": "Doctorate",
                  "specialization": "CSE",
                  "passingYear": "2015",
                  "gpaScore": "0"
              }
          ],
          "skills": [
              {
                  "skillName": "Azur",
                  "experience": "25",
                  "lastUsed": "02/2019",
                  "comment": " "
              },
              {
                  "skillName": "C++",
                  "experience": "10",
                  "lastUsed": "01/2019",
                  "comment": " "
              },
              {
                  "skillName": "Angular",
                  "experience": "10",
                  "lastUsed": "01/2018",
                  "comment": " "
              },
              {
                  "skillName": "MySQL",
                  "experience": "36",
                  "lastUsed": "01/2019",
                  "comment": " "
              },
              {
                  "skillName": "unit testing",
                  "experience": "30",
                  "lastUsed": "09/2019",
                  "comment": ""
              }
          ],
          "experience": [
              {
                  "employer": "Wipro",
                  "jobTitle": "jr. Manager",
                  "description": "The company description outlines vital details about your company, such as where you are located, how large the company is, what you do, and what you hope to accomplish.",
                  "startDate": "2018-05-02",
                  "endDate": "2018-12-07",
                  "isCurrent": "",
                  "supervisorName": "",
                  "supervisorPhone": "",
                  "responsibilities": "The company secretary is responsible for the efficient administration of a company, particularly with regard to ensuring compliance with statutory and regulatory requirements and for ensuring that decisions of the board of directors are implemented. Despite the name, the role is not clerical or secretarial.",
                  "techSkills": " "
              },
              {
                  "employer": "TCS",
                  "jobTitle": "Jr. Asst. Marketing Manager",
                  "description": "Show your passion: Let your passion and excitement show in the company description section as you explain why you started the company and what you hope to accomplish. Your excitement should show in the tone of your writing, and your aim should be to get the reader interested in reading the rest of the business plan.",
                  "startDate": "2019-01-08",
                  "endDate": "2019-09-02",
                  "isCurrent": "",
                  "supervisorName": "",
                  "supervisorPhone": "",
                  "responsibilities": "Furnishing the annual returns and forms according to the Companies Law.\nHelps chairman and directors in implementing some guidelines effectively.\nCS check the legal necessities required for the equipment concerned to share certificates.\nRegulates the flow of dividends in a phased manner according to the laws followed by the company.",
                  "techSkills": " "
              },
              {
                  "employer": "TechM",
                  "jobTitle": "Developer",
                  "description": "",
                  "startDate": "2019-07-02",
                  "endDate": "2019-09-04",
                  "isCurrent": "",
                  "supervisorName": "",
                  "supervisorPhone": "",
                  "responsibilities": "",
                  "techSkills": ""
              }
          ],
          "summary": "The company description outlines vital details about your company, such as where you are located, how large the company is, what you do, and what you hope to accomplish.",
          "gender": "male",
          "dob": "",
          "image": "data:image/png;base64,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",
          "flag": "1",
          "consent": {
              "veteran": "1",
              "disabled": "0"
          }
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0IiwiZW1haWwiOiJzbWxvZ2ljczJAZ21haWwuY29tIiwiaWF0IjoxNTY5MzA2MTAwLCJleHAiOjE1NjkzMDk3MDB9.fa7PZ9NzFCbpERrDO4L1ASRky__eHhYLSIfqknN2HHI"
   }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(()=>{
    component.ngOnInit();
    tick();
  }));

  it('#readMore', fakeAsync(()=>{
    component.jobPopup = false;
    component.readMore();
    tick();
    expect(component.jobPopup).toBe(true);
  }));

  it('#closeError', fakeAsync(()=>{
    component.jobPopup = true;
    component.isFailure1 = true;
    component.isFailure = true;
    component.closeError();
    tick();
    expect(component.jobPopup).toBe(false);
    expect(component.isFailure1).toBe(false);
    expect(component.isFailure).toBe(false);
  }));


  it('#checkMail', fakeAsync(()=>{
    component.checkMail();
    tick();

  }));

  it('#userLogin', fakeAsync(()=>{
    component.userLogin(null);
    tick();
    expect(component.data.statusCode.code).toEqual('200');
    expect(component.data.statusCode.code).toEqual('403');
    expect(component.error).toEqual('Invalid Credentials');
    expect(component.data.statusCode.code).toEqual('422');
    expect(component.error).toEqual('Invalid Password');
    expect(component.data.statusCode.code).toEqual('405');
    expect(component.error).toEqual('User is Not Activated');
  }));

  it('#register', fakeAsync(()=>{
    const addJobFrm: NgForm = new NgForm([], []);
    component.register(addJobFrm);
    tick();
    
  }));

  it('#closePopup', fakeAsync(()=>{
    component.isSuccess = true;
    component.closePopup();
    tick();
    expect(component.isSuccess).toBe(false);
  }));

  it('#closePopup1', fakeAsync(()=>{
    component.isFailure = true;
    component.closePopup1();
    tick();
    expect(component.isFailure).toBe(false);
  }));
  
});
