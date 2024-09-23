import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import COMMENT_DATA from '../../../db.json';
import { API_URL } from '../utils/resources';

describe('CommentsService', () => {
  let commentService: CommentsService;
  let httpTesting: HttpTestingController;

  // Move TestBed setup and inject inside beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    commentService = TestBed.inject(CommentsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding HTTP requests after each test
    httpTesting.verify();
  });

  it('should call comment service', () => {
    expect(commentService).toBeTruthy();
  });

  // Use waitForAsync to handle asynchronous behavior
  it('should get all comments', () => {
    //mock data
    const commentData = COMMENT_DATA.comments.slice(0, 2);

    commentService.getAllComments().subscribe((allComments: any) => {
      expect(allComments).toBeTruthy();
      expect(allComments.length).withContext('should have 2 items').toBe(2);
    });

    const req = httpTesting.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toEqual('GET');
    req.flush(commentData);
  });

  it('should get comment by id', () => {
    const commentData = COMMENT_DATA.comments[0];
    const ID = 1;

    commentService.getCommentById(ID).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
      expect(comment.text).toBe('a comment about post 1');
    });

    const req = httpTesting.expectOne(`${API_URL}/comments/${ID}`);
    expect(req.request.method).toEqual('GET');
    req.flush(commentData);
  });

  it('should create a comment', () => {
    const commentData = {
      id: 3,
      text: 'testing comment',
    };
    commentService.postComment(commentData).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
      expect(comment.text).toBe('testing comment');
    });

    const req = httpTesting.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toEqual('POST');
    req.flush(commentData);
  });

  it('should give error if save a comment fail', () => {
    const commentData = {
      id: 11,
      text: 'this is comment 11',
    };

    //api call successfull then NEXT is executed otherwise ERROR is executed
    commentService.postComment(commentData).subscribe({
      next: () => {
        console.log('Post was success');
        fail('save comment should have failed');
      },
      error: (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
      },
    });

    const req = httpTesting.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toEqual('POST');
    req.flush('FAILED', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
