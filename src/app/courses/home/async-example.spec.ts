import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Example', () => {
  it('Async test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Async test example with Angular Zone fakeAsync', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    // tick(1000);
    flush();
    expect(test).toBeTruthy('Unexpected value of test');
  }));

  it('Asynchronous test exam[ple - plain Promise', fakeAsync(() => {
    let test = false;
    console.log('Creating Promise');
    Promise.resolve()
      .then(() => {
        console.log('Promise first then() evaluated successfully');
        return Promise.resolve();
      })
      .then(() => {
        test = true;
        console.log('Promise second then() evaluated successfully');
      });
    flushMicrotasks();
    console.log('Running test assertion');
    expect(test).toBeTruthy();
  }));

  it('Asynchronous tét example - Promiose + setTimeout()', fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log('Running test assertions');
    expect(test).toBeTruthy();
  }));
});
