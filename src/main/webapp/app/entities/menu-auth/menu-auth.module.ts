import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';

import {
    MenuAuthService,
    MenuAuthPopupService,
    MenuAuthComponent,
    MenuAuthDetailComponent,
    MenuAuthDialogComponent,
    MenuAuthPopupComponent,
    MenuAuthDeletePopupComponent,
    MenuAuthDeleteDialogComponent,
    menuAuthRoute,
    menuAuthPopupRoute,
} from './';

let ENTITY_STATES = [
    ...menuAuthRoute,
    ...menuAuthPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MenuAuthComponent,
        MenuAuthDetailComponent,
        MenuAuthDialogComponent,
        MenuAuthDeleteDialogComponent,
        MenuAuthPopupComponent,
        MenuAuthDeletePopupComponent,
    ],
    entryComponents: [
        MenuAuthComponent,
        MenuAuthDialogComponent,
        MenuAuthPopupComponent,
        MenuAuthDeleteDialogComponent,
        MenuAuthDeletePopupComponent,
    ],
    providers: [
        MenuAuthService,
        MenuAuthPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMenuAuthModule {}
