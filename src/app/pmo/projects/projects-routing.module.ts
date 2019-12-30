import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { AssignProjectComponent } from './assign-project/assign-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { EditAssignedEmployeeComponent } from './edit-assigned-employee/edit-assigned-employee.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'projects', component: ProjectsComponent },
      { path: 'add-projects', component: AddProjectComponent },
      { path: 'assign-project', component: AssignProjectComponent },
      { path: 'edit-projects/:id', component: EditProjectComponent },
      { path: 'view-projects/:id', component: ViewProjectComponent },
      { path: 'edit-assigned-employees/:id', component: EditAssignedEmployeeComponent },
      { path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
