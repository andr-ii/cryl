import main from '../src';
import * as crypto from 'crypto';

const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

beforeEach(() => {
  process.argv = process.argv.slice(0, 2);
});

describe('error handling', () => {
  it('throws an error if enc or dec are not specified', async () => {
    expect.assertions(1);

    process.argv[2] = 'foo';

    await main();

    expect(logSpy).toHaveBeenCalledWith('Unsupported argument: "foo".');
  });

  it('throws an error if nothing was added to the flag', async () => {
    expect.assertions(1);

    process.argv = [
      ...process.argv,
      'enc',
      '-v',
      'some-value',
      '-b',
      'some-pass',
    ];

    await main();

    expect(logSpy).toHaveBeenCalledWith('Unsupported flag: "-b".');
  });

  it('throws an error if password was not added as a flag', async () => {
    expect.assertions(1);

    process.argv = [...process.argv, 'enc', '-v', 'some-value'];

    await main();

    expect(logSpy).toHaveBeenCalledWith(
      'Password must be specified! Received: "undefined".',
    );
  });

  it('throws an error if input was added as a value and a file', async () => {
    expect.assertions(1);

    process.argv = [
      ...process.argv,
      'enc',
      '-v',
      'some-value',
      '-p',
      'some-password',
      '-f',
      'file.log',
    ];

    await main();

    expect(logSpy).toHaveBeenCalledWith(
      'Specify only one option: either input file or value.',
    );
  });

  it('throws an error something went wrong during the validation', async () => {
    expect.assertions(1);

    jest.spyOn(crypto, 'scryptSync').mockImplementationOnce(() => {
      throw new Error('something went wrong');
    });

    process.argv = [
      ...process.argv,
      'enc',
      '-v',
      'some-value',
      '-p',
      'some-password',
    ];

    await main();

    expect(logSpy).toHaveBeenCalledWith(
      'Validation error: "something went wrong".',
    );
  });
});

describe('cli usage tests', () => {
  it('reads help file', async () => {
    expect.assertions(2);

    process.argv[2] = '--help';

    await main();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0].includes('ENCRYPT_OR_DECRYPT')).toBeTruthy();
  });

  it('encrypts raw data', async () => {
    expect.assertions(1);

    process.argv = [
      ...process.argv,
      'enc',
      '-v',
      'some-value',
      '-p',
      'some-password',
    ];

    const result = await main();

    expect(result).toStrictEqual('hs9noNxXplNPJ1hPHX60qg==');
  });

  it('encrypts an empty string if value was not specified', async () => {
    expect.assertions(1);

    process.argv = [...process.argv, 'enc', '-p', 'some-password', '-v'];

    const result = await main();

    // cspell:disable
    expect(result).toStrictEqual('b7ul4XrsVvxkdGmmMY6Xww==');
    // cspell:enable
  });
});
