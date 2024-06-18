import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from './core/services/login/after-login.service';
//Imports lógica del Usuario
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { ProfileComponent } from './public/profile/profile.component';
//Imports vistas públicas de la aplicación
import { IndexComponent } from './public/index/index.component';
import { InfoComponent } from './public/info/info.component';
//Imports lógica de cursos
import { IndexPathwayComponent } from './private/pathway/index-pathway/index-pathway.component';
import { ShowPathwayComponent } from './private/pathway/show-pathway/show-pathway.component';
import { StorePathwayComponent } from './private/pathway/store-pathway/store-pathway.component';
import { EditPathwayComponent } from './private/pathway/edit-pathway/edit-pathway.component';
import { ShowCourseComponent } from './private/course/show-course/show-course.component';
import { StoreCourseComponent } from './private/course/store-course/store-course.component';
import { EditCourseComponent } from './private/course/edit-course/edit-course.component';
import { ShowClassComponent } from './private/class/show-class/show-class.component';
import { StoreClassComponent } from './private/class/store-class/store-class.component';
import { EditClassComponent } from './private/class/edit-class/edit-class.component';
import { CompleteCourseComponent } from './private/course/complete-course/complete-course.component';
import { SolveExamComponent } from './private/exam/solve-exam/solve-exam.component';
import { StoreExamComponent } from './private/exam/store-exam/store-exam.component';

const routes: Routes = [
  //Enrutado lógica del Usuario
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  //Enrutado vistas públicas de la aplicación
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  //Enrutando lógica de cursos
  {
    path: 'pathway',
    component: IndexPathwayComponent,
  },
  {
    path: 'pathway/::id_pathway',
    component: ShowPathwayComponent,
  },
  {
    path: 'pathway/store/:id_pathway',
    component: StorePathwayComponent,
  },
  {
    path: 'pathway/update/::id_pathway',
    component: EditPathwayComponent,
  },
  {
    path: 'course/:id_course',
    component: ShowCourseComponent,
  },
  {
    path: 'course/store/:id_pathway',
    component: StoreCourseComponent,
  },
  {
    path: 'course/update/:id',
    component: EditCourseComponent,
  },
  {
    path: 'class/show/:id_class/:id_course',
    component: ShowClassComponent,
  },
  {
    path: 'class/store/:id_course',
    component: StoreClassComponent,
  },
  {
    path: 'class/update/:id_class/:id_course',
    component: EditClassComponent,
  },
  {
    path: 'complete-course/:id_course',
    component: CompleteCourseComponent,
  },
  {
    path: 'exam/show/:id_course',
    component: SolveExamComponent,
  },
  {
    path: 'exam/store/:id_course',
    component: StoreExamComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
