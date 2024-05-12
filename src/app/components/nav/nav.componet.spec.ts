import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync, flush } from "@angular/core/testing"
import { NavComponent } from "./nav.component"
import { Router, RouterLink, provideRouter } from "@angular/router"
import { routes } from "../../app.routes"
import { By } from "@angular/platform-browser"



describe("NavComponent", () => {
    let fixture: ComponentFixture<NavComponent>
    let component: NavComponent
    let router: Router;
    let linkDes: any
    let routerLinks: any

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavComponent
            ],
            providers: [
                provideRouter(routes),
                {provide:ComponentFixtureAutoDetect,useValue:true}
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(NavComponent)
        component = fixture.componentInstance
        router = TestBed.inject(Router)
        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
        // using each DebugElement's injector
        routerLinks = linkDes.map((de: any) => de.injector.get(RouterLink));
        // fixture.detectChanges()


    })
    it('Should have 2 routes', () => {
        expect(routerLinks.length).withContext('should have 2 routerLinks').toBe(2);
        expect(routerLinks[0].href).toBe('/');
        expect(routerLinks[1].href).toBe('/about');
    });
    it('Should have default route of home', () => {
        expect(router.url).toBe("/");
    });
    it('Should navigate to about when click on about link', fakeAsync(() => {
        const aboutLinkDebug = linkDes[1]
        aboutLinkDebug.triggerEventHandler('click', {button: 0});
        flush()
        expect(router.url).toBe("/about");

    }));
})