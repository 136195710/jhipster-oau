import {Routes} from "@angular/router";
import { UserRouteAccessService } from '../shared';

import {
    usercenterHomeRoute
} from './';

let USERCENTER_HOME_ROUTES = [
    usercenterHomeRoute
];

export const usercenterHomeState: Routes = [{
    path: '',
    children: USERCENTER_HOME_ROUTES
}];
