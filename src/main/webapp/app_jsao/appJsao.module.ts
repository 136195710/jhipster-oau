
import {JsaoHomeComponent} from "./home/jsao.home.component";
import {NgModule} from "@angular/core";
import {customHttpProvider} from "../app/blocks/interceptor/http.provider";
@NgModule({
    imports: [
        JsaoHomeComponent
    ],
    declarations: [
        JsaoHomeComponent
    ],
    providers: [
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        customHttpProvider(),
    ],
    bootstrap: [ JsaoHomeComponent ]
})
export class JsaoAppModule {}
