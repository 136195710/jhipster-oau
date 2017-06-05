import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {JhipsterSharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {usercenterHomeState} from "./usercenter.route";
import {HomeComponent} from "./home/usercenter.home.component";
import {UsercenterHome} from "./home/usercenter.home.service";

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(usercenterHomeState, { useHash: true })
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        UsercenterHome
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class JhipsterUsercenterHomeModule {}
