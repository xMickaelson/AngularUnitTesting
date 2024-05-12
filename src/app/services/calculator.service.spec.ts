import { CalculatorService } from "./calculator.service"
import { LoggerService } from "./logger.service"
import {TestBed} from '@angular/core/testing'

describe("CalculatorService",()=>{
    let logger: jasmine.SpyObj<LoggerService>
    let calService : CalculatorService

    beforeEach(()=>{
        const loggerSpy = jasmine.createSpyObj("LoggerService",["log"])
        // calService = new CalculatorService(logger)
         TestBed.configureTestingModule({
            providers:[
                CalculatorService,
                {provide:LoggerService,useValue:loggerSpy}
            ]
         })
         calService = TestBed.inject(CalculatorService)
         logger = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>
    })
    

    it("should add 2 nos",()=>{
      const res = calService.add(1,2)
      expect(res).toBe(3)
      expect(logger.log).toHaveBeenCalledTimes(1)
    })

    it("should multiply 2 nos",()=>{
        const res = calService.multiply(3,2) 
        expect(res).toBe(6)
        expect(logger.log).toHaveBeenCalledTimes(1)
    })
})