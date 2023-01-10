import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

describe('CalculatorService', () => {
  let loggerSpy: any;
  
  beforeEach(() => {
    console.log('before each');
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy
        }
      ]
    })
  });
  
  it('should add two numbers', () => {
    console.log('test add two number');

    const result = TestBed.inject(CalculatorService).add(2, 3);

    expect(result).toBe(5);

    expect(TestBed.inject(LoggerService).log).toHaveBeenCalledTimes(1);
  });

  it('should substract two numbers', () => {
    console.log('test substract two number');

    const result = TestBed.inject(CalculatorService).subtract(5, 2);

    expect(result).toBe(3, 'unexpected substraction');
    
    expect(TestBed.inject(LoggerService).log).toHaveBeenCalledTimes(1);
  });
});
