import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../../services/comments.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let commentComponent: CommentComponent;
  let commentService: jasmine.SpyObj<CommentsService>;
  let fixture: ComponentFixture<CommentComponent>;
  let component: CommentComponent;
  let el: DebugElement;
  beforeEach(async () => {
    const commSpy = jasmine.createSpyObj('CommentsService', [
      'getAllComments',
      'postComment',
    ]);
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [
        {
          provide: CommentsService,
          useValue: commSpy,
        },
      ],
    }).compileComponents();
    commentService = TestBed.inject(
      CommentsService
    ) as jasmine.SpyObj<CommentsService>;
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create comment component', () => {
    expect(component).toBeTruthy();
  });

  it('should have input and button present', () => {
    console.log(fixture.nativeElement);
    //querying to change manipulat the dom elements
    // expect(fixture.nativeElement.querySelector('h1').innerText).toBe(
    //   'welcome to comments section'
    // ); //same thing can be written using debug element in the following manner

    const getValUsingDebugElement = el.query(By.css('h1')).nativeElement
      .innerText;
    expect(getValUsingDebugElement).toBe('welcome to comments section');
    //querying in DOM to check if input and button element are present
    expect(fixture.nativeElement.querySelector('input'))
      .withContext("Can't find input")
      .toBeTruthy();

    expect(fixture.nativeElement.querySelector('button'))
      .withContext("Can't find button")
      .toBeTruthy();
  });

  it('should load comments on initialization', () => {
    const comments = [
      {
        id: 12,
        text: 'Comment 1',
      },

      {
        id: 13,
        text: 'Comment 2',
      },
    ];

    commentService.getAllComments.and.returnValue(of(comments));
    fixture.detectChanges(); //data is present in typescript file but not present in HTML file
    // it'll also call ngOnInit() method
    expect(el.queryAll(By.css('li')).length).toBe(2);
  });

  it('should display alert if comment text is empty on clicking submit', () => {
    const spyAlert = spyOn(window, 'alert');
    component.text = '';
    component.handleSubmit();
    expect(spyAlert).toHaveBeenCalledOnceWith('Please add a comment');
    // expect(window.alert).toHaveBeenCalledOnceWith('Please add a comment');
    expect(commentService.postComment).not.toHaveBeenCalled();
  });

  it('should add comment on UI, when user types and click on post button', () => {
    const comment = {
      id: 11,
      text: 'new comment for testing user typing and click on post button',
    };
    commentService.getAllComments.and.returnValue(
      of([])
    ); /*he returnValue method allows you to define the output of mocked methods or properties, ensuring that your tests remain deterministic and focused on the functionality you want to validate*/
    fixture.detectChanges();

    commentService.postComment.and.returnValue(of(comment));
    spyOn(Date, 'now').and.returnValue(11);

    //simulate user typing a comment
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    inputElement.value =
      'new comment for testing user typing and click on post button';

    //doing above thing will only put value in UI i.e inside value property of input tag, we have to handle
    //event also to push it inside typescript file's text = '' we'll have to do following

    inputElement.dispatchEvent(new Event('input'));

    //simulate user clicking on button
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();
    fixture.detectChanges();

    const commentLiElement = fixture.nativeElement.querySelectorAll('li');
    expect(commentLiElement.length).toBe(1);
  });
});
