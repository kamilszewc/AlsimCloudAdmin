import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { TasksComponent } from './tasks/tasks.component';
import { ResourcesComponent } from './resources/resources.component';
import { SchemasComponent } from './schemas/schemas.component';
import { FilesComponent } from './files/files.component';
import { GroupsComponent } from './groups/groups.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {LoginGuard} from "./login.guard";
import {TwoFaGuard} from "./two-fa/two-fa.guard"
import { UserComponent } from './user/user.component';
import {KeyValuePipe} from "@angular/common";
import { GroupComponent } from './group/group.component';
import { TaskComponent } from './task/task.component';
import { ResourceComponent } from './resource/resource.component';
import { SchemaComponent } from './schema/schema.component';
import { QueueComponent } from './queue/queue.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FileComponent } from './file/file.component';
import { StorageComponent } from './storage/storage.component';
import { SchemaCategoriesComponent } from './schema-categories/schema-categories.component';
import { EducationalDomainsComponent } from './educational-domains/educational-domains.component';
import {TwoFAComponent} from "./two-fa/two-fa.component";
import { AlarmDialogComponent } from './alarm-dialog/alarm-dialog.component';
import {AlarmDialogModule} from "./alarm-dialog/alarm-dialog.module";
import { UserStatisticsComponent } from './analytics/user-statistics/user-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { TaskStatisticsComponent } from './analytics/task-statistics/task-statistics.component';
import { ResourceStatisticsComponent } from './analytics/resource-statistics/resource-statistics.component';
import { SchemaCategoryComponent } from './schema-category/schema-category.component';
import { SolversComponent } from './solvers/solvers.component';
import { ObjectGroupsComponent } from './object-groups/object-groups.component';
import { ObjectGroupComponent } from './object-group/object-group.component';
import { ObjectComponent } from './object/object.component';
import { LicenseTypesComponent } from './license-types/license-types.component';
import { LicenseTypeComponent } from './license-type/license-type.component';
import { LicenseComponent } from './license/license.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LicenseOptionComponent } from './license-option/license-option.component';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'users/:id', component: UserComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'group/:id', component: GroupComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'task/:id', component: TaskComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'resource/:id', component: ResourceComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'schemas', component: SchemasComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'schema/:id', component: SchemaComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'queue', component: QueueComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'files', component: FilesComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'file/:id', component: FileComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'storage', component: StorageComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'storage/:id', component: StorageComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'schemaCategories', component: SchemaCategoriesComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'schemaCategories/:id', component: SchemaCategoryComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'educationalDomains', component: EducationalDomainsComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'user-statistics', component: UserStatisticsComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'task-statistics', component: TaskStatisticsComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'resource-statistics', component: ResourceStatisticsComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'solvers', component: SolversComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'object-groups', component: ObjectGroupsComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'object-group/:id', component: ObjectGroupComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'object/:id', component: ObjectComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'license-types', component: LicenseTypesComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'license-type/:id', component: LicenseTypeComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'license-option/:id', component: LicenseOptionComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'licenses', component: LicensesComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'license/:id', component: LicenseComponent, canActivate: [LoginGuard, TwoFaGuard] },
  { path: 'twoFA', component: TwoFAComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent }
]

const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    TasksComponent,
    ResourcesComponent,
    SchemasComponent,
    FilesComponent,
    GroupsComponent,
    UserComponent,
    GroupComponent,
    TaskComponent,
    ResourceComponent,
    SchemaComponent,
    QueueComponent,
    FileComponent,
    StorageComponent,
    SchemaCategoriesComponent,
    EducationalDomainsComponent,
    TwoFAComponent,
    UserStatisticsComponent,
    TaskStatisticsComponent,
    ResourceStatisticsComponent,
    SchemaCategoryComponent,
    SolversComponent,
    ObjectGroupsComponent,
    ObjectGroupComponent,
    ObjectComponent,
    LicenseTypesComponent,
    LicenseTypeComponent,
    LicenseComponent,
    LicensesComponent,
    LicenseOptionComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        HttpClientModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        FormsModule,
        MatProgressSpinnerModule,
        AlarmDialogModule,
        NgChartsModule
    ],
  exports: [RouterModule],
  providers: [
    HttpInterceptorProviders,
    KeyValuePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
