import { Readable } from 'stream';
import { Decipher } from 'crypto';

export const decrypt = async (
  input: Readable,
  output: NodeJS.WritableStream,
  decipher: Decipher,
) => {
  try {
    let result = '';

    await new Promise((resolve, reject) => {
      input.on('data', (chunk) => {
        result += decipher.update(chunk, 'base64', 'utf8');
      });

      input.on('end', () => {
        try {
          result += decipher.final('utf8') + '\n';
          Readable.from(result).pipe(output);
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    throw new Error(`Decryption has failed: ${error.message}`);
  }
};
