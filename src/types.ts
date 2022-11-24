import { EncryptionType, Flags, FlagValues } from './utils/constants';

export type Options = Partial<Record<typeof FlagValues[Flags], string>>;
export type MainOptions = { type: EncryptionType; values: Options } | undefined;
