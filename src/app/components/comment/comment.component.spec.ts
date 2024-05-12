import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CommentComponent } from "./comment.component"
import { CommentsService } from "../../services/comments.service"
import { DebugElement, input } from "@angular/core"
import { By } from "@angular/platform-browser"
import { of } from "rxjs"



describe("CommentComponent",()=>{

    let commentsService: jasmine.SpyObj<CommentsService>
    let fixture:ComponentFixture<CommentComponent>
    let component:CommentComponent;
    let el:DebugElement;

    beforeEach(async ()=>{
        const commSpy = jasmine.createSpyObj("CommentsService",["getAllComments","postComment"])
        await TestBed.configureTestingModule({
            imports:[CommentComponent],
            providers:[
                {provide:CommentsService,useValue:commSpy}
            ]
        }).compileComponents()

        commentsService = TestBed.inject(CommentsService) as  jasmine.SpyObj<CommentsService>
        fixture = TestBed.createComponent(CommentComponent)
        component = fixture.componentInstance;
        el = fixture.debugElement
  
    })


    it("should have input and button present",()=>{
      
         expect(el.query(By.css("h1")).nativeElement.innerText).toBe("welcome to comments section")
        // expect(fixture.nativeElement.querySelector("h1").innerText).toBe("welcome to comments section")
        expect(fixture.nativeElement.querySelector("input")).withContext("Can't find input").toBeTruthy()
        expect(fixture.nativeElement.querySelector("button")).withContext("Can't find button").toBeTruthy()
    })

    it("should load comments on initialization",()=>{
        const comments = [{ id: 1, text: 'Comment 1' }, { id: 2, text: 'Comment 2' }];
        commentsService.getAllComments.and.returnValue(of(comments))
        fixture.detectChanges()
        expect(el.queryAll(By.css("li")).length).toBe(2)

    })

    it("should display alert if comment text is empty on submition",()=>{
        spyOn(window,"alert")
        component.text = ""
        component.handleSubmit()
        expect(window.alert).toHaveBeenCalledOnceWith("Please add a comment")
        expect(commentsService.postComment).not.toHaveBeenCalled()
    })

    it("should add comment on UI when user types and click on post btn",()=>{
        const comment = {id:1,text:"Nice pic dear"}
        commentsService.getAllComments.and.returnValue(of([]))
        fixture.detectChanges()

        commentsService.postComment.and.returnValue(of(comment))
        spyOn(Date,"now").and.returnValue(1)

        // simulate user typing a comment
        const inputElemet:HTMLInputElement = fixture.nativeElement.querySelector("input")
        inputElemet.value = comment.text
        inputElemet.dispatchEvent(new Event("input"))

        // simulate user clicking on button
        const buttonElement:HTMLButtonElement = fixture.nativeElement.querySelector("button")
        buttonElement.click()
        fixture.detectChanges()

        const commentsLiElements = fixture.nativeElement.querySelectorAll("li")


        expect(commentsLiElements.length).toBe(1)
        expect(commentsLiElements[0].innerText).toBe(comment.text)
        expect(commentsService.postComment).toHaveBeenCalledWith(comment)

    })
})