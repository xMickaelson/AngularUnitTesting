import { Component } from "@angular/core";
import { HighlightDirective } from "./highlight.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";


@Component({
    selector: 'test-comment',
    standalone: true,
    template: `
      <div appHighlight>testing</div>
    `,
    imports: [HighlightDirective]
})
class TestComponent { }

describe("HighlightDirective", () => {
    let fixture: ComponentFixture<TestComponent>
    let divElemet: HTMLElement
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(TestComponent);
        divElemet = fixture.nativeElement.querySelector("div")
        fixture.detectChanges()
    })

    it("should have red bg color",()=>{
        expect(divElemet.style.backgroundColor).toBe("red")
    })
    it("should increase font size when mouseenter",()=>{
        divElemet.dispatchEvent(new Event("mouseenter"))
        expect(divElemet.style.fontSize).toBe("30px")
    })
    it("should reset font size when mouseleave",()=>{
        divElemet.dispatchEvent(new Event("mouseenter"))
        divElemet.dispatchEvent(new Event("mouseleave"))
        expect(divElemet.style.fontSize).toBe("20px")
    })

})