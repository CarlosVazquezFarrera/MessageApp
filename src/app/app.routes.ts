import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'feed', component: FeedComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];
