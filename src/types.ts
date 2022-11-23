import { EncryptionType, Flags, FlagValues } from './utils/constants';

export type ParsedFlags = Partial<Record<typeof FlagValues[Flags], string>>;
export type Options = { type: EncryptionType; values: ParsedFlags } | undefined;
