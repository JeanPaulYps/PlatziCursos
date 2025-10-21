/* eslint-disable @angular-eslint/component-class-suffix */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-banner'
})
class BannerComponentStub{}

@Component({
  selector: 'app-footer'
})
class FooterComponentStub{}



fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerComponentStub,
        FooterComponentStub
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }); 

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should exist 7 links', () => {
    const links =queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links).toHaveSize(7)
  });

  it('should exist 7 links', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub));
    expect(links).toHaveSize(7);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  });

});
