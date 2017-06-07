
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {JsaoAppModule} from "./appJsao.module";
import {ProdConfig} from "../app/blocks/config/prod.config";

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}
platformBrowserDynamic().bootstrapModule(JsaoAppModule);
