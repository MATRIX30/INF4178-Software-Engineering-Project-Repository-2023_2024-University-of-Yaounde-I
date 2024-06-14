import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { InscriptionComponent } from './Components/pages/inscription/inscription.component';
import { ConnexionComponent } from './Components/pages/connexion/connexion.component';
import { HomeUserComponent } from './Components/pages/home-user/home-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: "Institute - Accueil" },
  { path: 'register', component: InscriptionComponent, title: "Institute - Inscription" },
  { path: 'login', component: ConnexionComponent, title: "Institute - Connexion" },
  { path: '/user/home', component: HomeUserComponent, title: "Utilisateur - Tableau de bord" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
