import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  beforeEach(() => {
    TestBed.configureCompiler({
      providers: [LoggerService],
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should create logger service', () => {
    expect(loggerService).toBeTruthy();
  });

  it('should call console.log when log is called', () => {
    const loggerSpy = spyOn(console, 'log');

    const testMessage = 'Test Message';
    loggerService.log(testMessage);
    expect(loggerSpy).toHaveBeenCalledWith(`LOGGER LOG:${testMessage}`);
  });
});
