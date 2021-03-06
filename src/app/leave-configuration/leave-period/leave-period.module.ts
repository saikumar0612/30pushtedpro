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
import { EditLeavePeriodComponent } from './leave-period/edit-leave-period/edit-leave-period.component';
import { LeavePeriodComponent } from './leave-period/leave-period.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { LeavePeriodRoutingModule } from './leave-period-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({ 
  imports: [
    CommonModule,
    LeavePeriodRoutingModule,
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
    SharedModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  declarations: [
    EditLeavePeriodComponent,
    LeavePeriodComponent
  ]
})
export class LeavePeriodModule { }
