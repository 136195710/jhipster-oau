import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MenuAuth } from './menu-auth.model';
import { MenuAuthPopupService } from './menu-auth-popup.service';
import { MenuAuthService } from './menu-auth.service';

@Component({
    selector: 'jhi-menu-auth-delete-dialog',
    templateUrl: './menu-auth-delete-dialog.component.html'
})
export class MenuAuthDeleteDialogComponent {

    menuAuth: MenuAuth;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuAuthService: MenuAuthService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menuAuth']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.menuAuthService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'menuAuthListModification',
                content: 'Deleted an menuAuth'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-auth-delete-popup',
    template: ''
})
export class MenuAuthDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuAuthPopupService: MenuAuthPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.menuAuthPopupService
                .open(MenuAuthDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
