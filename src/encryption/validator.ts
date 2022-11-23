import { ParsedFlags } from '../types';
import * as fs from 'fs';
import { Readable } from 'stream';
import { ALGORITHM, EncryptionType } from '../utils/constants';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';

const encryptionConstructorByType = {
  [EncryptionType.Encrypt]: createCipheriv,
  [EncryptionType.Decrypt]: createDecipheriv,
};

export const validateOptions = (type: EncryptionType, options: ParsedFlags) => {
  const { password, inputFile, outputFile, value } = options;

  if (type === EncryptionType.Encrypt && (password?.trim().length ?? '') < 6) {
    throw new Error('Password must be longer than 6 characters');
  }

  if (value != null && inputFile != null) {
    throw new Error('Specify only one option: either input file or value.');
  }

  if (password === undefined) {
    throw new Error(`Unsupported password value: ${password}`);
  }

  try {
    const output = (
      outputFile == null ? process.stdout : fs.createWriteStream(outputFile)
    ) as NodeJS.WritableStream;

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
    throw new Error(`Validation error: ${error.message}`);
  }
};
