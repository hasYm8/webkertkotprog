import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BaseComponent } from './pages/base/base.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'base', pathMatch: 'full' },
  { path: 'base', component: BaseComponent, ...canActivate(() => redirectLoggedInTo(['home'])) },
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['home'])) },
  { path: 'register', component: RegisterComponent, ...canActivate(() => redirectLoggedInTo(['home'])) },
  { path: 'home', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['base'])) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
