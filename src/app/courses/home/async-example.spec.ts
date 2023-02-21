import { fakeAsync, flush, tick } from '@angular/core/testing';

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
    flush();
    expect(test).toBeTruthy('Unexpected value of test');
  }));
});
