/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { parseArgs } from './utils/parseArgs';
import { MainOptions } from './types';
import { encryptOrDecrypt } from './encryption';
import { readHelpFile } from './utils/readHelpFile';

export const main = async (
  options?: MainOptions,
): Promise<string | undefined> => {
  try {
    const { type, values } = options == null ? parseArgs() : options;
    const isPackage = options != null;

    if ((type as string) === '--help') {
      await readHelpFile();
      return;
    }

    const result = await encryptOrDecrypt(type, values, isPackage);

    return result;
  } catch (error) {
    if (options == null) {
      console.log(error.message);
      return;
    }

    throw error;
  }
};
