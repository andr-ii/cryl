import { parseArgs } from './utils/parseArgs';
import { MainOptions } from './types';
import { encryptOrDecrypt } from './encryption';
import { readHelpFile } from './utils/readHelpFile';
import { EncryptionType } from './utils/constants';

export const main = async (
  options: MainOptions,
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

export const libBuilder =
  (type: EncryptionType) =>
  (value: string, password: string, outputFile?: string) => {
    return main({
      type,
      values: {
        value,
        password,
        outputFile,
      },
    });
  };

export const libFileBuilder =
  (type: EncryptionType) =>
  (inputFile: string, password: string, outputFile?: string) => {
    return main({
      type,
      values: {
        password,
        inputFile,
        outputFile,
      },
    });
  };
