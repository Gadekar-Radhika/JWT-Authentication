import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
 
export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'signIn', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path:'userprofile', component:UserProfileComponent
    },
    {
        path: '', redirectTo: '/signIn', pathMatch: 'full'
    }
];