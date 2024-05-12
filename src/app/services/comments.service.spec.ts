import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CommentsService } from "./comments.service";
import { API_URL } from "../utils/resources";
import COMMENTS_DATA from '../../../db.json'


describe("CommentService", () => {
    let commService: CommentsService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CommentsService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });
        commService = TestBed.inject(CommentsService)
        httpTesting = TestBed.inject(HttpTestingController);
    })

    afterEach(()=>{
        httpTesting.verify()
    })

    it("should give all comments", () => {
        const commnetData = COMMENTS_DATA.comments.slice(0, 2)
        commService.getAllComments().subscribe((allcomments: any) => {
            expect(allcomments).toBeTruthy()
            expect(allcomments.length).withContext("should have 2 items").toBe(2)
        })

        const req = httpTesting.expectOne(`${API_URL}/comments`)
        expect(req.request.method).toEqual("GET");
        req.flush(commnetData)
    })

    it("should give a comment by ID", () => {
        const commnetData = COMMENTS_DATA.comments[0]
        const ID = 1
        commService.getCommentById(ID).subscribe((comment: any) => {
            expect(comment).toBeTruthy()
            expect(comment.text).toBe("a comment about post 1")
        })
     
        const req = httpTesting.expectOne(`${API_URL}/comments/${ID}`)
        expect(req.request.method).toEqual("GET");
        req.flush(commnetData)

    })

    it("should save a comment", () => {
        const commnetData = {
            id: 10,
            text: "Comment added by testing"
        }

        commService.postComment(commnetData).subscribe((comment: any) => {
            expect(comment).toBeTruthy()
            expect(comment.text).toBe(commnetData.text)
        })

        const req = httpTesting.expectOne(`${API_URL}/comments`)
        expect(req.request.method).toEqual("POST");
        req.flush(commnetData)
    })
    it("should give error if save a comment fails", () => {
        const commnetData = {
            id: 11,
            text: "Comment added by testing"
        }

        commService.postComment(commnetData).subscribe(
            {
                next: () => {
                    fail("Save comment should have failed")
                },
                error:(err:HttpErrorResponse)=>{
                    expect(err.status).toBe(500)
                }
            }
        )

        const req = httpTesting.expectOne(`${API_URL}/comments`)
        expect(req.request.method).toEqual("POST");
        req.flush("FAILED!!",{status:500,statusText:"Internal server error"})
    })


})