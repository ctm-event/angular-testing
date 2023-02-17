fdescribe('Async Testing Example', () => {
  it('Async test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done(); 
    }, 1000);
  });
});
