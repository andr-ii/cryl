import { Options } from '../types';
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
  options: Options,
  isPackage: boolean,
) => {
  const { input, output, cipherOrDecipher } = validateOptions(
    type,
    options,
    isPackage,
  );

  const handler = encryptionHandlerByType[type];

  return handler(input, output, cipherOrDecipher);
};
