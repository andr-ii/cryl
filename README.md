[![Pull Request CI](https://github.com/andr-ll/cryl/actions/workflows/continuous_integration.yml/badge.svg)](https://github.com/andr-ll/cryl/actions/workflows/continuous_integration.yml)
[![Node.js Package Release](https://github.com/andr-ll/cryl/actions/workflows/release.yml/badge.svg)](https://github.com/andr-ll/cryl/actions/workflows/release.yml)

# cryl

### The password based encryption/decryption tool. Allows to encrypt string values or files. Available as a CLI-tool or js/ts package.

## Install

Make sure you have added `@andr-ll:registry=https://npm.pkg.github.com` to `~/.npmrc` file before installation.

```bash
# For cli usage
npm i -g @andr-ll/cryl

# For npm package usage
npm i @andr-ll/cryl
```

## CLI Usage

<!-- cspell:disable -->

```bash
# Encrypts "some-string" string and prints result to stdout.
cryl enc -v some-string -p some-password

# Decrypts "RgkFVBoFBwluDK4tRZOjgw==" string and prints result to stdout.
cryl dec -v RgkFVBoFBwluDK4tRZOjgw== -p some-password

# Encrypts file and prints output to "./out.key" file.
cryl enc -f path/to/file.json -p some-password -o ./out.key

# Decrypts file and prints result to stdout.
cryl dec -f ./out.key -p some-password
```

<!-- cspell:enable -->

Also see a [help](./help) file for additional information.

```bash
cryl --help
```

## NPM Package usage

A NPM package provides encryption and decryption promise functions for string values and files.

For string values functions: If result is successful - string value will be returned.

If error occurred during execution - it will be thrown.

## Encryption

### A simple string encryption:

```ts
import { encrypt } from '@andr-ll/cryl';

const encryptedString = await encrypt('some-string', 'password');

console.log(encryptedString); // 'szCiRKg7LwIn27uBOFpBaQ=='
```

```ts
import { encrypt } from '@andr-ll/cryl';

await encrypt('some-string', 'password', 'encrypted.key'); // writes result to 'encrypted.key' file;
```

### A file encryption:

```ts
import { encryptFile } from '@andr-ll/cryl';

const encryptedFile = await encryptFile('./package.json', 'password');

console.log(encryptedFile); // 'encrypted package.json file'
```

```ts
import { encryptFile } from '@andr-ll/cryl';

await encryptFile('./package.json', 'password', 'encrypted.key'); // writes result to 'encrypted.key' file;
```

## Decryption

### A simple string decryption:

```ts
import { decrypt } from '@andr-ll/cryl';

const decryptedValue = await decrypt('szCiRKg7LwIn27uBOFpBaQ==', 'password');

console.log(decryptedValue); // 'some-string'
```

```ts
import { decrypt } from '@andr-ll/cryl';

await decrypt('szCiRKg7LwIn27uBOFpBaQ==', 'password', 'result.log'); // writes result to 'result.log' file;
```

### A file decryption:

```ts
import { decryptFile } from '@andr-ll/cryl';

const decryptedFile = await decryptFile('./encrypted.key', 'password');

console.log(decryptedFile); // 'decrypted file'
```

```ts
import { decryptFile } from '@andr-ll/cryl';

await decryptFile('./encrypted.key', 'password', 'result.log'); // writes result to 'result.log' file;
```
