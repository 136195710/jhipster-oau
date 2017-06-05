import {Route} from "@angular/router";
import {HomeComponent} from "./usercenter.home.component";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";

export const usercenterHomeRoute:Route={
    path: 'uHome',
    component : HomeComponent,
    data: {
        authorities: [],
        pageTitle: '测试登录'
    },
    canActivate: [UserRouteAccessService]
}
