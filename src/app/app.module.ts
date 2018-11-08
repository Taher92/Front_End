import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/Auth.service';
import { HomeComponent } from './Home/Home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { routes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { SafePipe } from './pipes/safe.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailsResolver } from './resolvers/member-details.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        RegisterComponent,
        MemberListComponent,
        ListsComponent,
        MessagesComponent,
        MemberCardComponent,
        MemberDetailComponent,
        SafePipe,

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgxGalleryModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        RouterModule.forRoot(routes),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:44340'],
                blacklistedRoutes: ['https://localhost:44340/api/account']
            }
        })
    ],
    providers: [
        AuthService,
        ErrorInterceptorProvider,
        AlertifyService,
        AuthGuard,
        UserService,
        MemberDetailsResolver,
        MemberListResolver
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
