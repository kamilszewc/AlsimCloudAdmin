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
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { TasksComponent } from './tasks/tasks.component';
import { ResourcesComponent } from './resources/resources.component';
import { SchemasComponent } from './schemas/schemas.component';
import { FilesComponent } from './files/files.component';
import { GroupsComponent } from './groups/groups.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {LoginGuard} from "./login.guard";

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [LoginGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [LoginGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [LoginGuard]  },
  { path: 'resources', component: ResourcesComponent, canActivate: [LoginGuard] },
  { path: 'schemas', component: SchemasComponent, canActivate: [LoginGuard] },
  { path: 'files', component: FilesComponent, canActivate: [LoginGuard] },
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
    GroupsComponent
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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
