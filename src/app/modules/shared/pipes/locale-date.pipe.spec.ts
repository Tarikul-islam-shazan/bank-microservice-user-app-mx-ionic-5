import { LocaleDatePipe } from './locale-date.pipe';

describe('LocaleDatePipe', () => {
  it('create an instance', () => {
    const pipe = new LocaleDatePipe('en-US');
    expect(pipe).toBeTruthy();
  });
});
