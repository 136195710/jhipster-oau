import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { MenuAuth } from './menu-auth.model';
import { MenuAuthService } from './menu-auth.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-menu-auth',
    templateUrl: './menu-auth.component.html'
})
export class MenuAuthComponent implements OnInit, OnDestroy {
menuAuths: MenuAuth[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuAuthService: MenuAuthService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['menuAuth']);
    }

    loadAll() {
        this.menuAuthService.query().subscribe(
            (res: Response) => {
                this.menuAuths = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMenuAuths();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: MenuAuth) {
        return item.id;
    }



    registerChangeInMenuAuths() {
        this.eventSubscriber = this.eventManager.subscribe('menuAuthListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
