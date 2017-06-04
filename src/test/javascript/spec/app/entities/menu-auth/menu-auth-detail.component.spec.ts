import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MenuAuthDetailComponent } from '../../../../../../main/webapp/app/entities/menu-auth/menu-auth-detail.component';
import { MenuAuthService } from '../../../../../../main/webapp/app/entities/menu-auth/menu-auth.service';
import { MenuAuth } from '../../../../../../main/webapp/app/entities/menu-auth/menu-auth.model';

describe('Component Tests', () => {

    describe('MenuAuth Management Detail Component', () => {
        let comp: MenuAuthDetailComponent;
        let fixture: ComponentFixture<MenuAuthDetailComponent>;
        let service: MenuAuthService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MenuAuthDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    MenuAuthService
                ]
            }).overrideComponent(MenuAuthDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuAuthDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuAuthService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MenuAuth(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.menuAuth).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
