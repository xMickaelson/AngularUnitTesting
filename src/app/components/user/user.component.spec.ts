import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from "@angular/core/testing";
import { UserComponent } from "./user.component";
import { DebugElement } from "@angular/core";



describe("UserComponent",()=>{
    let fixture:ComponentFixture<UserComponent>
    let component:UserComponent;

    beforeEach(async ()=>{
    
        await TestBed.configureTestingModule({
            imports:[UserComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(UserComponent)
        component = fixture.componentInstance;
        fixture.detectChanges()
    })

    it("should show username after button click - (done)",(done)=>{
          const buttonElement:HTMLButtonElement = fixture.nativeElement.querySelector("button")
          buttonElement.click()

          setTimeout(()=>{
            expect(component.username).toBe("Leanne Graham")
            done()
          },1000)
        
    })

    xit("should show username after button click - (fakeAsync)",fakeAsync(()=>{
          const buttonElement:HTMLButtonElement = fixture.nativeElement.querySelector("button")
          buttonElement.click()
          flush()
          expect(component.username).toBe("Ramesh Verma")
          
    }))

    it("should show username after button click - (waitForAsync)",waitForAsync(()=>{
          const buttonElement:HTMLButtonElement = fixture.nativeElement.querySelector("button")
          buttonElement.click()
          fixture.whenStable().then(()=>{
             expect(component.username).toBe("Leanne Graham")
          })
          
    }))

   

    

})