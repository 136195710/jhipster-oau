import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuAuth } from './menu-auth.model';
import { MenuAuthService } from './menu-auth.service';
@Injectable()
export class MenuAuthPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private menuAuthService: MenuAuthService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.menuAuthService.find(id).subscribe(menuAuth => {
                this.menuAuthModalRef(component, menuAuth);
            });
        } else {
            return this.menuAuthModalRef(component, new MenuAuth());
        }
    }

    menuAuthModalRef(component: Component, menuAuth: MenuAuth): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.menuAuth = menuAuth;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
