import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpModule } from '@angular/http';
import { AddEmploymentStatusComponent } from './add-employment-status/add-employment-status.component';
import { EditEmploymentStatusComponent } from './edit-employment-status/edit-employment-status.component';
import { EmploymentStatusComponent } from './employment-status/employment-status.component';

import { EmployeeStatusRoutingModule } from './employee-status-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeeStatusRoutingModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    DataTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    ArchwizardModule,
    CustomFormsModule,
    DateRangePickerModule,
    ImageCropperModule,
    ChartsModule,
    CKEditorModule,
    SharedModule
  ],
  declarations: [    
    AddEmploymentStatusComponent,
    EditEmploymentStatusComponent,
    EmploymentStatusComponent
  ]
})
export class EmployeeStatusModule { }
