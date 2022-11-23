import { Readable } from 'stream';

import { Cipher } from 'crypto';

export const encrypt = async (
  input: Readable,
  output: NodeJS.WritableStream,
  cipher: Cipher,
) => {
  input.on('data', (chunk) => {
    output.write(cipher.update(chunk, 'utf8', 'base64'));
  });

  input.on('end', () => {
    output.write(cipher.final('base64') + '\n');
  });
};
