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

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [LoginGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard] },
  { path: 'users/:id', component: UserComponent, canActivate: [LoginGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [LoginGuard] },
  { path: 'group/:id', component: GroupComponent, canActivate: [LoginGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [LoginGuard] },
  { path: 'task/:id', component: TaskComponent, canActivate: [LoginGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [LoginGuard] },
  { path: 'resource/:id', component: ResourceComponent, canActivate: [LoginGuard] },
  { path: 'schemas', component: SchemasComponent, canActivate: [LoginGuard] },
  { path: 'schema/:id', component: SchemaComponent, canActivate: [LoginGuard] },
  { path: 'queue', component: QueueComponent, canActivate: [LoginGuard] },
  { path: 'files', component: FilesComponent, canActivate: [LoginGuard] },
  { path: 'file/:id', component: FileComponent, canActivate: [LoginGuard] },
  { path: 'storage', component: StorageComponent, canActivate: [LoginGuard] },
  { path: 'storage/:id', component: StorageComponent, canActivate: [LoginGuard] },
  { path: 'schemaCategories', component: SchemaCategoriesComponent, canActivate: [LoginGuard] },
  { path: 'educationalDomains', component: EducationalDomainsComponent, canActivate: [LoginGuard] },
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
    EducationalDomainsComponent
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
        MatProgressSpinnerModule
    ],
  exports: [RouterModule],
  providers: [
    HttpInterceptorProviders,
    KeyValuePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
