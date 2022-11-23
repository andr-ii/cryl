import { parseArgs } from './utils/parseArgs';
import { Options } from './types';
import { encryptOrDecrypt } from './encryption';
import { readHelpFile } from './utils/readHelpFile';

export const main = async (options: Options) => {
  try {
    const { type, values } = options == null ? parseArgs() : options;

    if ((type as string) === '--help') {
      await readHelpFile();
      return;
    }

    await encryptOrDecrypt(type, values);
  } catch (error) {
    console.log(error.message);
  }
};
