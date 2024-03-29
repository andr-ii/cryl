/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { Options } from '../types';
import * as fs from 'fs';
import { Readable } from 'stream';
import { ALGORITHM, EncryptionType } from '../utils/constants';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';

const encryptionConstructorByType = {
  [EncryptionType.Encrypt]: createCipheriv,
  [EncryptionType.Decrypt]: createDecipheriv,
};

export const validateOptions = (
  type: EncryptionType,
  options: Options,
  isPackage: boolean,
) => {
  const { password, inputFile, value } = options;
  const outputFile =
    options.outputFile == null && isPackage ? '/dev/null' : options.outputFile;

  if (password === undefined) {
    throw new Error(`Password must be specified! Received: "${password}".`);
  }

  if (type === EncryptionType.Encrypt && password.trim().length < 6) {
    throw new Error('Password must be longer than 6 characters.');
  }

  if (value != null && inputFile != null) {
    throw new Error('Specify only one option: either input file or value.');
  }

  try {
    const output =
      outputFile == null ? process.stdout : fs.createWriteStream(outputFile);

    const input =
      inputFile == null
        ? Readable.from(value ?? '')
        : fs.createReadStream(inputFile, {
            encoding: 'utf8',
          });

    const salt = Buffer.from(password, 'hex');
    const saltedPassword = scryptSync(password, salt, 24);
    const iv = scryptSync(password, saltedPassword, 16);

    const cipherOrDecipherConstructor = encryptionConstructorByType[type];

    const cipherOrDecipher = cipherOrDecipherConstructor(
      ALGORITHM,
      saltedPassword,
      iv,
    );

    return { input, output, cipherOrDecipher };
  } catch (error) {
    throw new Error(`Validation error: "${error.message}".`);
  }
};
