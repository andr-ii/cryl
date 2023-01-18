import { encrypt, encryptFile } from '../src';

describe('error handling', () => {
  it('throws an error if password does not have enough length', async () => {
    expect.assertions(1);

    try {
      await encryptFile('./help', 'short');
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Password must be longer than 6 characters.',
      );
    }
  });
});

describe('encryption tests', () => {
  it('encrypts raw data', async () => {
    expect.assertions(3);

    const result = await encrypt('foo', 'some-password');

    expect(typeof result).toStrictEqual('string');
    expect(result?.length).toBeGreaterThan(5);
    // cspell:disable
    expect(result).toStrictEqual('cooq11MWfaSyzeiBCu3Aqg==');
    // cspell:enable
  });

  it('encrypts a file data', async () => {
    expect.assertions(2);

    const result = await encryptFile('./help', 'some-password');

    expect(typeof result).toStrictEqual('string');
    expect(result?.length).toBeGreaterThan(100);
  });
});
