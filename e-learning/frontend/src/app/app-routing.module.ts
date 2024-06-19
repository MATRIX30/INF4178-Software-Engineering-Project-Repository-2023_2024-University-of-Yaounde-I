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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: "Accueil" },
  { path: 'register', component: InscriptionComponent, title: "Inscription" },
  { path: 'login', component: ConnexionComponent, title: "Connexion" },
  { path: 'cours', component: CoursComponent, title: "Cours" },
  {
    path: 'user/home', component: HomeUserComponent, children: [
      { path: 'dashboard', component: HomeUserDashboardComponent },
      {path: 'unfinished-courses', component: HomeUserCoursNonTermineComponent},
      {path: 'finished-courses', component: HomeUserCoursTermineComponent},
      {path: 'available-evaluation', component: EvaluationDispnibleComponent},
      {path: 'finished-evaluation', component: EvaluationTermineComponent},
    ]
  },
  {path: 'user/home/evaluation', component: EvaluationComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
