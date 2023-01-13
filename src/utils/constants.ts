/**
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

export enum EncryptionType {
  Encrypt = 'enc',
  Decrypt = 'dec',
}

export enum Flags {
  InputFile = '-f',
  OutputFile = '-o',
  Password = '-p',
  Value = '-v',
}

export const FlagValues = {
  [Flags.InputFile]: 'inputFile',
  [Flags.OutputFile]: 'outputFile',
  [Flags.Password]: 'password',
  [Flags.Value]: 'value',
} as const;

export const FlagsMap = new Map(Object.entries(FlagValues));

export const ALGORITHM = 'aes-192-cbc';
export const PATH_TO_HELP_FILE = './help';
