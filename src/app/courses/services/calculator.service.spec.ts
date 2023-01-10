import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculator: CalculatorService;
  let loggerSpy: any;
  
  beforeEach(() => {
    console.log('before each');
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(loggerSpy);
  });
  
  it('should add two numbers', () => {
    console.log('test add two number');
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should substract two numbers', () => {
    console.log('test substract two number');
    const result = calculator.subtract(5, 2);
    expect(result).toBe(3, 'unexpected substraction');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
