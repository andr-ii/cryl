import { Readable } from 'stream';
import { Decipher } from 'crypto';

export const decrypt = async (
  input: Readable,
  output: NodeJS.WritableStream,
  decipher: Decipher,
): Promise<string> => {
  try {
    const resultString = await new Promise<string>((resolve, reject) => {
      let result = '';

      input.on('data', (chunk) => {
        result += decipher.update(chunk, 'base64', 'utf8');
      });

      input.on('end', () => {
        try {
          result += decipher.final('utf8');
          Readable.from(result + '\n').pipe(output);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    return resultString;
  } catch (error) {
    throw new Error(`Decryption has failed: ${error.message}`);
  }
};
