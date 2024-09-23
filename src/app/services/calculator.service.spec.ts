// import { TestBed } from '@angular/core/testing';
// import { CalculatorService } from './calculator.service';
// import { LoggerService } from './logger.service';

// describe('CalculatorService', () => {
//   let logger: jasmine.SpyObj<LoggerService>;
//   let calcService: CalculatorService;

//   beforeEach(() => {
//     logger = jasmine.createSpyObj('LoggerService', ['log']);
//     TestBed.configureTestingModule();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let loggerService: LoggerService;
  let calculatorService: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService, CalculatorService],
    });
    loggerService = TestBed.inject(LoggerService);
    calculatorService = TestBed.inject(CalculatorService);
  });

  it('should call logger service', () => {
    expect(loggerService).toBeTruthy();
  });

  it('should call calculator service', () => {
    expect(calculatorService).toBeTruthy();
  });

  it('should call sum of two numbers', () => {
    const loggerSpy = spyOn(loggerService, 'log');
    calculatorService.add(2, 4);
    expect(loggerSpy).toHaveBeenCalledWith(`Adding 2 and 4`);
  });

  it('should call multiply two numbers', () => {
    const loggerSpy = spyOn(loggerService, 'log');
    calculatorService.multiply(2, 4);
    expect(loggerSpy).toHaveBeenCalledWith('multiplying 2 and 4');
  });

  it('should multiply two number', () => {
    const multiplyNumbers = calculatorService.multiply(2, 3);
    expect(multiplyNumbers).toBe(6);
  });

  it('should add two numbers', () => {
    const addNumbers = calculatorService.add(1, 2);
    expect(addNumbers).toBe(3);
  });
});
