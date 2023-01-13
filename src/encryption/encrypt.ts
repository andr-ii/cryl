/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { Readable } from 'stream';
import { Cipher } from 'crypto';

export const encrypt = async (
  input: Readable,
  output: NodeJS.WritableStream,
  cipher: Cipher,
) =>
  new Promise<string>((resolve) => {
    let result = '';

    input.on('data', (chunk) => {
      const encryptedData = cipher.update(chunk, 'utf8', 'base64');
      output.write(encryptedData);
      result += encryptedData;
    });

    input.on('end', () => {
      const encryptedFinal = cipher.final('base64');
      output.write(encryptedFinal + '\n');
      resolve(result + encryptedFinal);
    });
  });
