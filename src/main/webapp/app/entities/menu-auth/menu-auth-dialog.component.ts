import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MenuAuth } from './menu-auth.model';
import { MenuAuthPopupService } from './menu-auth-popup.service';
import { MenuAuthService } from './menu-auth.service';

@Component({
    selector: 'jhi-menu-auth-dialog',
    templateUrl: './menu-auth-dialog.component.html'
})
export class MenuAuthDialogComponent implements OnInit {

    menuAuth: MenuAuth;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private menuAuthService: MenuAuthService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menuAuth']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.menuAuth.id !== undefined) {
            this.menuAuthService.update(this.menuAuth)
                .subscribe((res: MenuAuth) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.menuAuthService.create(this.menuAuth)
                .subscribe((res: MenuAuth) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MenuAuth) {
        this.eventManager.broadcast({ name: 'menuAuthListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-menu-auth-popup',
    template: ''
})
export class MenuAuthPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuAuthPopupService: MenuAuthPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.menuAuthPopupService
                    .open(MenuAuthDialogComponent, params['id']);
            } else {
                this.modalRef = this.menuAuthPopupService
                    .open(MenuAuthDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
