import { ParsedFlags } from '../types';
import { EncryptionType } from '../utils/constants';
import { validateOptions } from './validator';
import { decrypt } from './decrypt';
import { encrypt } from './encrypt';

const encryptionHandlerByType = {
  [EncryptionType.Encrypt]: encrypt,
  [EncryptionType.Decrypt]: decrypt,
};

export const encryptOrDecrypt = async (
  type: EncryptionType,
  options: ParsedFlags,
) => {
  const { input, output, cipherOrDecipher } = validateOptions(type, options);

  const handler = encryptionHandlerByType[type];

  await handler(input, output, cipherOrDecipher);
};
