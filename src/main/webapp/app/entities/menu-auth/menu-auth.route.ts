import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MenuAuthComponent } from './menu-auth.component';
import { MenuAuthDetailComponent } from './menu-auth-detail.component';
import { MenuAuthPopupComponent } from './menu-auth-dialog.component';
import { MenuAuthDeletePopupComponent } from './menu-auth-delete-dialog.component';

import { Principal } from '../../shared';


export const menuAuthRoute: Routes = [
  {
    path: 'menu-auth',
    component: MenuAuthComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.menuAuth.home.title'
    }
  }, {
    path: 'menu-auth/:id',
    component: MenuAuthDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.menuAuth.home.title'
    }
  }
];

export const menuAuthPopupRoute: Routes = [
  {
    path: 'menu-auth-new',
    component: MenuAuthPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.menuAuth.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu-auth/:id/edit',
    component: MenuAuthPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.menuAuth.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu-auth/:id/delete',
    component: MenuAuthDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.menuAuth.home.title'
    },
    outlet: 'popup'
  }
];
