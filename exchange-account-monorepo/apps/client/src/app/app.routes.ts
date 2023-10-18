import { Route } from '@angular/router';
import { AccountsListViewComponent } from '../components/accounts-list-view/accounts-list-view.component';
import { AccountDetailViewComponent } from '../components/account-detail-view/account-detail-view.component';

export const appRoutes: Route[] = [
    { path: '', component: AccountsListViewComponent },
    { path: 'detail', component: AccountDetailViewComponent }
];
