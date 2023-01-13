/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { EncryptionType, FlagsMap } from './constants';
import { Options } from '../types';

export const parseArgs = () => {
  const type = process.argv[2] as EncryptionType;

  if (
    !Object.values(EncryptionType).includes(type) &&
    (type as string) !== '--help'
  ) {
    throw new Error(`Unsupported argument: ${type}`);
  }

  const allArgs = process.argv.slice(3);
  const parsedFlags: Options = {};

  for (let i = 0; i < allArgs.length; i += 2) {
    const flag = allArgs[i];
    const value = allArgs[i + 1];

    const flagKey = FlagsMap.get(flag);

    if (flagKey === undefined) {
      throw new Error(`Unsupported flag ${flag}`);
    }

    parsedFlags[flagKey] = value;
  }

  return { type, values: parsedFlags };
};
