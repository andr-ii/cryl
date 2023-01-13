/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { main } from './main';
import { libBuilder } from './libBuilder';
import { EncryptionType } from './utils/constants';

export default main;

export const encrypt = libBuilder(EncryptionType.Encrypt);
export const decrypt = libBuilder(EncryptionType.Decrypt);

export const encryptFile = libBuilder(EncryptionType.Encrypt, { isFile: true });
export const decryptFile = libBuilder(EncryptionType.Decrypt, { isFile: true });
