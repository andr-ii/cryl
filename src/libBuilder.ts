/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { main } from './main';
import { EncryptionType } from './utils/constants';

type SharedArguments = [password: string, outputFile?: string];

type RawValueFunction = (
  ...args: [value: string, ...shared: SharedArguments]
) => Promise<string | undefined>;

type FileValueFunction = (
  ...args: [inputFile: string, ...shared: SharedArguments]
) => Promise<string | undefined>;

export function libBuilder(type: EncryptionType): RawValueFunction;

export function libBuilder(
  type: EncryptionType,
  options?: { isFile: boolean },
): FileValueFunction;

export function libBuilder(
  type: EncryptionType,
  options?: { isFile: boolean },
) {
  return (value: string, password: string, outputFile?: string) => {
    const inputType = options?.isFile ? { inputFile: value } : { value };

    return main({
      type,
      values: {
        ...inputType,
        password,
        outputFile,
      },
    });
  };
}
