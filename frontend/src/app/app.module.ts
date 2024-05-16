import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { ProfileComponent } from './public/profile/profile.component';
import { APIConnectionsService } from './core/services/login/apiconnections.service';
import { AuthHandlerService } from './core/services/login/auth-handler.service';
import { TokenHandlerService } from './core/services/login/token-handler.service';
import { AfterLoginService } from './core/services/login/after-login.service';
import { BeforeLoginService } from './core/services/login/before-login.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './public/index/index.component';
import { InfoComponent } from './public/info/info.component';
import { IndexPathwayComponent } from './private/pathway/index-pathway/index-pathway.component';
import { ShowPathwayComponent } from './private/pathway/show-pathway/show-pathway.component';
import { ShowCourseComponent } from './private/course/show-course/show-course.component';
import { ShowClassComponent } from './private/class/show-class/show-class.component';
import { StorePathwayComponent } from './private/pathway/store-pathway/store-pathway.component';
import { EditPathwayComponent } from './private/pathway/edit-pathway/edit-pathway.component';
import { StoreCourseComponent } from './private/course/store-course/store-course.component';
import { EditCourseComponent } from './private/course/edit-course/edit-course.component';
import { EditClassComponent } from './private/class/edit-class/edit-class.component';
import { StoreClassComponent } from './private/class/store-class/store-class.component';
import { CompleteCourseComponent } from './private/course/complete-course/complete-course.component';
import { StoreExamComponent } from './private/exam/store-exam/store-exam.component';
import { EditExamComponent } from './private/exam/edit-exam/edit-exam.component';
import { SolveExamComponent } from './private/exam/solve-exam/solve-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    IndexComponent,
    InfoComponent,
    IndexPathwayComponent,
    ShowPathwayComponent,
    ShowCourseComponent,
    ShowClassComponent,
    StorePathwayComponent,
    EditPathwayComponent,
    StoreCourseComponent,
    EditCourseComponent,
    EditClassComponent,
    StoreClassComponent,
    CompleteCourseComponent,
    StoreExamComponent,
    EditExamComponent,
    SolveExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    APIConnectionsService,
    AuthHandlerService,
    TokenHandlerService,
    AfterLoginService,
    BeforeLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
