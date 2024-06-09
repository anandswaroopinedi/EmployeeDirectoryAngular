import { FormatNullToNonePipe } from './format-null-to-none.pipe';

describe('FormatNullToNonePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatNullToNonePipe();
    expect(pipe).toBeTruthy();
  });
});
