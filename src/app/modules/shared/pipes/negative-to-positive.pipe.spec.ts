import { NegativeToPositivePipe } from './negative-to-positive.pipe';

describe('NegToPosPipe', () => {
  it('create an instance', () => {
    const pipe = new NegativeToPositivePipe();
    expect(pipe).toBeTruthy();
  });
});
