import { decrypt } from '../src';

describe('error handling', () => {
  it('throws an error if decryption has failed', async () => {
    expect.assertions(1);

    try {
      await decrypt('aaa', 'some-password');
    } catch (error) {
      const testError = new RegExp(/^Decryption has failed: .*$/g);

      expect(testError.test(error.message)).toBeTruthy();
    }
  });
});

describe('decryption tests', () => {
  it('decrypts raw data', async () => {
    expect.assertions(2);

    // cspell:disable
    const result = await decrypt('cooq11MWfaSyzeiBCu3Aqg==', 'some-password');
    // cspell:enable

    expect(typeof result).toStrictEqual('string');
    expect(result).toStrictEqual('foo');
  });
});
