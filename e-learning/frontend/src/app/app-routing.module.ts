import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { InscriptionComponent } from './Components/pages/inscription/inscription.component';
import { ConnexionComponent } from './Components/pages/connexion/connexion.component';
import { HomeUserComponent } from './Components/pages/home-user/home-user.component';
import { CoursComponent } from './Components/pages/cours/cours.component';
import { HomeUserDashboardComponent } from './Components/pages/home-user-dashboard/home-user-dashboard.component';
import { HomeUserCoursNonTermineComponent } from './Components/pages/home-user-cours-non-termine/home-user-cours-non-termine.component';
import { HomeUserCoursTermineComponent } from './Components/pages/home-user-cours-termine/home-user-cours-termine.component';
import { EvaluationDispnibleComponent } from './Components/pages/evaluation-dispnible/evaluation-dispnible.component';
import { EvaluationTermineComponent } from './Components/pages/evaluation-termine/evaluation-termine.component';
import { EvaluationComponent } from './Components/pages/evaluation/evaluation.component';
import { CertificatTemplateComponent } from './Components/pages/certificat-template/certificat-template.component';
import { AboutComponent } from './Components/pages/about/about.component';
import { SuiviCoursComponent } from './Components/pages/suivi-cours/suivi-cours.component';
import { HomeTeacherComponent } from './Components/pages/home-teacher/home-teacher.component';
import { HomeTeacherDashboardComponent } from './Components/pages/home-teacher-dashboard/home-teacher-dashboard.component';
import { HomeTeacherCourseComponent } from './Components/pages/home-teacher-course/home-teacher-course.component';
import { HomeAdminComponent } from './Components/pages/home-admin/home-admin.component';
import { HomeAdminDashboardComponent } from './Components/pages/home-admin-dashboard/home-admin-dashboard.component';
import { HomeAdminTeacherComponent } from './Components/pages/home-admin-teacher/home-admin-teacher.component';
import { HomeAdminDomainComponent } from './Components/pages/home-admin-domain/home-admin-domain.component';
import { HomeAdminDomainVoirComponent } from './Components/pages/home-admin-domain-voir/home-admin-domain-voir.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: "Accueil" },
  { path: 'register', component: InscriptionComponent, title: "Inscription" },
  { path: 'login', component: ConnexionComponent, title: "Connexion" },
  { path: 'cours', component: CoursComponent, title: "Cours" },
  { path: 'about', component: AboutComponent, title: "A propos" },
  { path: 'cours-detail', component: SuiviCoursComponent, title: "Course details" },
  { path: 'user/home/evaluation', component: EvaluationComponent },
  { path: 'certificat', component: CertificatTemplateComponent, title: "Certificat de fin de cours" },
  {path: 'home-teacher', component: HomeTeacherComponent, title: "home teacher"},
  {path: 'home-teacher-course', component: HomeTeacherCourseComponent, title: "home teacher course"},
  {path: 'home-teacher-dashboard', component: HomeTeacherDashboardComponent, title: "home teacher dashboard"},
  {path: 'home-teacher', component: HomeTeacherComponent, title: "home teacher"},
  {path: 'home-admin-teacher', component: HomeAdminTeacherComponent, title: "home admin teacher"},
  {path: 'home-admin-domain', component: HomeAdminDomainComponent, title: "home admin domain"},
  {path: 'home-admin-domain-voir', component: HomeAdminDomainVoirComponent, title: "home admin domain voir"},
  {path: 'home-admin-dashboard', component: HomeAdminDashboardComponent, title: "home admin dashboard"},



  // User =====================================================================================
  {
    path: 'user/home', component: HomeUserComponent, title: 'Tableau de bord', children: [
      { path: 'dashboard', component: HomeUserDashboardComponent },
      { path: 'unfinished-courses', component: HomeUserCoursNonTermineComponent },
      { path: 'finished-courses', component: HomeUserCoursTermineComponent },
      { path: 'available-evaluation', component: EvaluationDispnibleComponent },
      { path: 'finished-evaluation', component: EvaluationTermineComponent },
    ]
  },

  // Teacher =====================================================================================
  {
    path: 'teacher/home', component: HomeTeacherComponent, title: 'Tableau de bord', children: [
      { path: 'dashboard', component: HomeTeacherDashboardComponent },
      { path: 'courses', component: HomeTeacherCourseComponent },
    ]
  },
  // Admin =====================================================================================
  {
    path: 'admin/home', component: HomeAdminComponent, title: 'Tableau de bord', children: [
      { path: 'dashboard', component: HomeAdminDashboardComponent },
      { path: 'teacher', component: HomeAdminTeacherComponent },
      { path: 'domain', component: HomeAdminDomainComponent },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
