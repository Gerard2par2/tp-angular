import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListTableComponent } from './user/user-list/user-list-table.component';
import { UsersPageComponent } from './user/users-page.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { UserListFilterLabelPipe } from './shared/pipes/user-list-filter-label.pipe';
import { UserFormComponent } from './user/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    UserListTableComponent,
    UsersPageComponent,
    UserListTableComponent,
    UserDetailsComponent,
    FormatDatePipe,
    UserListFilterLabelPipe,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    FontAwesomeModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
