import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MenuAuth } from './menu-auth.model';
import { MenuAuthService } from './menu-auth.service';

@Component({
    selector: 'jhi-menu-auth-detail',
    templateUrl: './menu-auth-detail.component.html'
})
export class MenuAuthDetailComponent implements OnInit, OnDestroy {

    menuAuth: MenuAuth;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuAuthService: MenuAuthService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['menuAuth']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.menuAuthService.find(id).subscribe(menuAuth => {
            this.menuAuth = menuAuth;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
