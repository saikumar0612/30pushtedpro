import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PrerequisitesComponent } from './prerequisites.component';
import { UserService } from '../../../core/services';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserServiceStub } from '../../../mocks/UserServiceStub';
import { LocationStub } from '../../../mocks/LocationStub';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

describe('PrerequisitesComponent', () => {
  let component: PrerequisitesComponent;
  let fixture: ComponentFixture<PrerequisitesComponent>;
  const userServiceStub = new UserServiceStub();
  const locationStub = new LocationStub();
  let currentUser:any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrerequisitesComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Location, useValue: locationStub }
      ],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FileUploadModule,
        DataTableModule,
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        ImageCropperModule,
        ChartsModule,
        RouterTestingModule,
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerequisitesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    localStorage.setItem('currentUser', JSON.stringify({
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY0NjM0NTUxLCJleHAiOjE1NjQ2NTI1NTF9.gNsDldeY4OeFA91fBmE0n4CXOSEeJ_GbjS5fgr6twB4',
      email: 'pavan.basolutions@gmail.com',
      id: '1',
      flag: null,
      empType: {
        id: '5',
        employeeType: 'Employee'
      },
      userType: {
        id: '3',
        name: 'employee',
        typeName: 'Employee'
      },
      first_name: 'Davidsvids',
      last_name: 'jackson',
      middle_name: 'james',
      isAdmin: true,
      Adminrole: true,
      permission: {
        createWorkShifts: true,
        createAssignLeave: false,
        createCandidates: true,
        createCompanyInfo: true,
        createCustomers: false,
        createEducation: true,
        createEmployeestatus: true,
        createHolidays: true,
        createJobCategorie: true,
        createJobTitle: true,
        createLanguages: true,
        createLicenses: true,
        createMemberships: true,
        createPayGrade: true,
        createProjects: true,
        createSkills: true,
        createTerminationReasons: true,
        createTimesheets: true,
        createUser: true,
        createRole: true,
        updateWorkShifts: true,
        updateCandidates: true,
        updateCustomers: false,
        updateEducation: true,
        updateEmployeestatus: true,
        updateHolidays: true,
        updateJobCategorie: true,
        updateJobTitle: true,
        updateLanguages: true,
        updateLicenses: true,
        updateMemberships: true,
        createActivity: false,
        updateActivity: false,
        updatePayGrade: true,
        updateProjects: true,
        updateSkills: true,
        activities: false,
        getActivity: false,
        updateTerminationReasons: true,
        updateTimesheets: true,
        updateUser: true,
        updateRole: true,
        readWorkShifts: true,
        readAssignLeave: false,
        readCandidates: true,
        readCustomers: false,
        readEducation: true,
        readEmployeestatus: true,
        readEmployeeTimesheets: true,
        readHolidays: true,
        readJobTitle: true,
        readLanguages: true,
        readLicenses: true,
        readMemberships: true,
        readPayGrade: true,
        readProjects: true,
        readSkills: true,
        readTerminationReasons: true,
        readUser: true,
        readConfiguration: true,
        createPermission: false,
        readPermission: false,
        updatePermission: true,
        updatePrefix: true,
        createBranch: true,
        updateBranch: true,
        readSettings: true,
        createJob: true,
        updateJob: true,
        readJob: true,
        readRole: true,
        updateClientCompany: true,
        createClientCompany: true,
        readClientCompany: true,
        readVendorCompany: true,
        readClientContacts: true,
        updateClientContacts: true,
        createClientContacts: true,
        readVendorContacts: true,
        readTimesheets: true,
        viewTimesheet: true,
        readJobDetails: true,
        updateJobDetails: true,
        readSalaryComponent: true,
        createSalaryComponent: true,
        updateSalaryComponent: true,
        readKpi: true,
        createKpi: true,
        updateKpi: true,
        readTracker: true,
        createTracker: true,
        updateTracker: true,
        readReview: true,
        createReview: true,
        updateReview: true,
        createEmployeeType: true,
        createLeave: true,
        updateLeave: true,
        readLeave: true,
        readOrganizationalKpi: true,
        updateOrganizationalKpi: true,
        readTermsConditions: true,
        updateTermsConditions: true,
        createTermsConditions: true,
        createUserApplyLeave: true,
        updateUserApplyLeave: true,
        addEntitlements: true,
        readEntitlements: true,
        updateEmployeeType: true,
        readEmployeeType: true,
        updateVendorCompany: true,
        createVendorCompany: true,
        createVendorContacts: true,
        updateVendorContacts: true,
        readJobCategorie: true,
        readEmployeeReviews: true,
        readSupervisorReviews: true,
        createOrganizationalKpi: false,
        readUserReports: true
      },
      submenuPermission: {
        clientCompany: true,
        vendorCompany: true,
        clientCompanyContact: true,
        vendorCompanyContact: true,
        jobPosting: true,
        candidates: true,
        projects: true,
        assignProjects: true,
        myTimesheets: true,
        employeeTimesheet: true,
        kPIs: true,
        manageReviews: true,
        myReviews: true,
        employeeReviews: true,
        leavePeriod: true,
        leaveType: true,
        entitlements: true,
        reports: true,
        leaveList: true,
        assignLeave: true,
        applyLeave: true,
        myEntitlements: true
      },
      fieldPermission: {
        readdob: true,
        updatedob: true,
        createdob: true,
        readssn: true,
        createssn: true,
        updatessn: true,
        readInternalNotes: true,
        createInternalNotes: true,
        updateInternalNotes: true,
        readJobInternalNotes: true,
        createJobInternalNotes: true,
        updateJobInternalNotes: true
      }
    }));
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.userPermissions).toEqual(component.currentUser.permission);
  }));

  it('#editTemplate', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigateByUrl');
    component.editTemplate('1');
    component.url = "/prerequisites/edit-prerequisite-doc/";
    expect(routerstub.navigateByUrl).toHaveBeenCalled();
  }));

  it('#viewTemplate', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigateByUrl');
    component.viewTemplate('1');
    component.url = "/prerequisites/view-prerequisite-doc/";
    expect(routerstub.navigateByUrl).toHaveBeenCalled();
  }));

  it('#getPrerequisiteDocs', fakeAsync(() => {
    component.getPrerequisiteDocs();
    tick();
    expect(component.filterData.length).toEqual(component.types.length);
    if(component.filterData){
      expect(component.availableRecords).toEqual(component.filterData.length);
    }  
  }));

  it('#search', fakeAsync(() => {
    component.types = [];
    let term = null;
    let key = null;
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.types.length);

    term = 'testTerm';
    key = 'name';
    component.types = [{type:'testTerm'}];
    component.search(term, key);
    tick();
    expect(component.filterData.length).toEqual(component.types.length);

  }));

});
