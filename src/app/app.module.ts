import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './nav/nav.component';
import { MedSuppComponent } from './med-supp/med-supp.component';
import { HomeComponent } from './home/home.component';
import { WebsiteComponent } from './website/website.component';
import { HidepassPipe } from './shared/hidepass.pipe';
import { UrlShortString } from './shared/urlshortstring.pipe';
import { CopyToClipComponent } from './shared/copy to clipboard/copytoclipboard.component';
import { ShortString } from './shared/shortstring.pipe';
import { FilterDataPipe } from './shared/filter.data.pipe';
import { NotePopupComponent } from './shared/notepopup/notepopup.component';
import { ChatComponent } from './chat/chat.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ChatActivityComponent } from './chat-activity/chat-activity.component';
import { OtherChatActivityComponent } from './other-chat-activity/other-chat-activity.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { DenialsComponent } from './denials/denials.component';
import { SliderComponent } from './slider/slider.component';
import { DsliderComponent } from './denials/dslider/dslider.component';
import { AddBackComponent } from './add-back/add-back.component';
import { ClearinghouseComponent } from './clearinghouse/clearinghouse.component';
import { WaystarComponent } from './clearinghouse/waystar/waystar.component';
import { ChHomeComponent } from './clearinghouse/ch-home/ch-home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ClaimMailingDetailsComponent } from './claim-mailing-details/claim-mailing-details.component';
import { PodiatryDenialsComponent } from './podiatry-denials/podiatry-denials.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterDataWebsitePipe } from './shared/filter.data.website';
import { AvailityComponent } from './availity/availity.component';
import { AvNavComponent } from './availity/av-nav/av-nav.component';
import { AvViewComponent } from './availity/av-view/av-view.component';
import { ClaimsComponent } from './availity/av-view/claims/claims.component';
import { EligibilityComponent } from './availity/av-view/eligibility/eligibility.component';
import { RemittanceviewerComponent } from './availity/av-view/remittanceviewer/remittanceviewer.component';
import { PayerspacesComponent } from './availity/av-view/payerspaces/payerspaces.component';
import { BcbsPrefixComponent } from './bcbs-prefix/bcbs-prefix.component';
import { FilterDataBCBSPrefixPipe } from './shared/filter.data.BCBSPrefix';
import { HoverTextComponent } from './shared/hover-text/hover-text.component';
import { ErrorAlertComponent } from './shared/error-alert/error-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardComponent,
    SpinnerComponent,
    LoginComponent,
    NavComponent,
    MedSuppComponent,
    HomeComponent,
    WebsiteComponent,
    HidepassPipe,
    UrlShortString,
    CopyToClipComponent,
    ShortString,
    FilterDataPipe,
    NotePopupComponent,
    ChatComponent,
    ChatActivityComponent,
    OtherChatActivityComponent,
    DenialsComponent,
    SliderComponent,
    DsliderComponent,
    AddBackComponent,
    ClearinghouseComponent,
    WaystarComponent,
    ChHomeComponent,
    ComingSoonComponent,
    ClaimMailingDetailsComponent,
    PodiatryDenialsComponent,
    PageNotFoundComponent,
    FilterDataWebsitePipe,
    HoverTextComponent,
    AvailityComponent,
    AvNavComponent,
    AvViewComponent,
    ClaimsComponent,
    EligibilityComponent,
    RemittanceviewerComponent,
    PayerspacesComponent,
    BcbsPrefixComponent,
    FilterDataBCBSPrefixPipe,
    ErrorAlertComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"ar-project-v2","appId":"1:597750197498:web:d0f335903a51f754e72d43","databaseURL":"https://ar-project-v2-default-rtdb.firebaseio.com","storageBucket":"ar-project-v2.firebasestorage.app","apiKey":"AIzaSyBhK2spzS2y4Ubuu6McZF7JACQDxgycIfg","authDomain":"ar-project-v2.firebaseapp.com","messagingSenderId":"597750197498","measurementId":"G-FL2DTYL9WQ"})),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({"projectId":"ar-project-v2","appId":"1:597750197498:web:afa42f5fbbdf155ae72d43","databaseURL":"https://ar-project-v2-default-rtdb.firebaseio.com","storageBucket":"ar-project-v2.firebasestorage.app","apiKey":"AIzaSyBhK2spzS2y4Ubuu6McZF7JACQDxgycIfg","authDomain":"ar-project-v2.firebaseapp.com","messagingSenderId":"597750197498","measurementId":"G-MNXF6HNV21"}))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
