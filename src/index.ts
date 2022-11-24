import { libBuilder, libFileBuilder, main } from './main';
import { EncryptionType } from './utils/constants';

export default main;

export const encrypt = libBuilder(EncryptionType.Encrypt);
export const decrypt = libBuilder(EncryptionType.Decrypt);

export const encryptFile = libFileBuilder(EncryptionType.Encrypt);
export const decryptFile = libFileBuilder(EncryptionType.Decrypt);
