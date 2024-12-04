import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { MedSuppComponent } from './med-supp/med-supp.component';
import { WebsiteComponent } from './website/website.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { DenialsComponent } from './denials/denials.component';
import { ClaimMailingDetailsComponent } from './claim-mailing-details/claim-mailing-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PodiatryDenialsComponent } from './podiatry-denials/podiatry-denials.component';
import { AvailityComponent } from './availity/availity.component';
import { AvViewComponent } from './availity/av-view/av-view.component';
import { ClaimsComponent } from './availity/av-view/claims/claims.component';
import { EligibilityComponent } from './availity/av-view/eligibility/eligibility.component';
import { RemittanceviewerComponent } from './availity/av-view/remittanceviewer/remittanceviewer.component';
import { PayerspacesComponent } from './availity/av-view/payerspaces/payerspaces.component';
import { BcbsPrefixComponent } from './bcbs-prefix/bcbs-prefix.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'bcbs-prefix', component: BcbsPrefixComponent, canActivate: [AuthGuard]},
  {path: 'denials', component: DenialsComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'Medigap', component: MedSuppComponent, canActivate: [AuthGuard]},
  {path: 'website', component: WebsiteComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'podiatry-denials', component: PodiatryDenialsComponent, canActivate: [AuthGuard]},
  {path: 'claim-mailing', component: ClaimMailingDetailsComponent, canActivate: [AuthGuard]},
  {path: 'availity', component: AvailityComponent,children: [
    {path: '', component: AvViewComponent},
    {path: 'claims', component: ClaimsComponent},
    {path: 'eligibility', component: EligibilityComponent},
    {path: 'remittanceviewer', component: RemittanceviewerComponent},
    {path: 'payerspaces', component: PayerspacesComponent},
  ]},

  // {path: 'home', component: HomeComponent},
  // {path: 'denials', component: DenialsComponent},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'Medigap', component: MedSuppComponent},
  // {path: 'website', component: WebsiteComponent},
  // {path: 'chat', component: ChatComponent},
  // {path: 'claim-mailing', component: ClaimMailingDetailsComponent},
  // {path: 'podiatry-denials', component: PodiatryDenialsComponent},
  // {path: 'clearingHouse', component: ClearinghouseComponent},
  // {path: 'availity', component: AvailityComponent, children: [
  //   {path: '', component: AvViewComponent},
  //   {path: 'claims', component: ClaimsComponent},
  //   {path: 'eligibility', component: EligibilityComponent},
  //   {path: 'remittanceviewer', component: RemittanceviewerComponent},
  //   {path: 'payerspaces', component: PayerspacesComponent},
  // ]},

  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
