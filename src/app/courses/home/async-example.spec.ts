import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

fdescribe('Async Testing Example', () => {
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

  fit('Asynchronous test exam[ple - plain Promise', fakeAsync(() => {
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
});
