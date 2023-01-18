# cryl

[![GitHub Packages][pkg-img]][pkg-url]
[![Package Build][build-img]][build-url]
[![Coverage Status][coverage-img]][coverage-url]

The password based encryption/decryption tool. Allows to encrypt string values or files. Available as a CLI-tool or js/ts package.

> **Warning** 
>
> **Do not use in the real work-related projects!**
>
> The `password-based encryption` does not provide as good protection as `symmetric/asymmetric encryption`.

## Install

> **Note**
>
> Make sure you have added registry configuration and your GitHub token
> to `~/.npmrc` file before installation.

```bash
echo '//npm.pkg.github.com/:_authToken=$TOKEN
@andr-ii:registry=https://npm.pkg.github.com' >> ~/.npmrc
```

Then install the package:

```bash
# For cli usage
npm i -g @andr-ii/cryl

# For npm package usage
npm i @andr-ii/cryl
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
import { encrypt } from '@andr-ii/cryl';

const encryptedString = await encrypt('some-string', 'password');

console.log(encryptedString); // 'szCiRKg7LwIn27uBOFpBaQ=='
```

```ts
import { encrypt } from '@andr-ii/cryl';

await encrypt('some-string', 'password', 'encrypted.key'); // writes result to 'encrypted.key' file;
```

### A file encryption:

```ts
import { encryptFile } from '@andr-ii/cryl';

const encryptedFile = await encryptFile('./package.json', 'password');

console.log(encryptedFile); // 'encrypted package.json file'
```

```ts
import { encryptFile } from '@andr-ii/cryl';

await encryptFile('./package.json', 'password', 'encrypted.key'); // writes result to 'encrypted.key' file;
```

## Decryption

### A simple string decryption:

```ts
import { decrypt } from '@andr-ii/cryl';

const decryptedValue = await decrypt('szCiRKg7LwIn27uBOFpBaQ==', 'password');

console.log(decryptedValue); // 'some-string'
```

```ts
import { decrypt } from '@andr-ii/cryl';

await decrypt('szCiRKg7LwIn27uBOFpBaQ==', 'password', 'result.log'); // writes result to 'result.log' file;
```

### A file decryption:

```ts
import { decryptFile } from '@andr-ii/cryl';

const decryptedFile = await decryptFile('./encrypted.key', 'password');

console.log(decryptedFile); // 'decrypted file'
```

```ts
import { decryptFile } from '@andr-ii/cryl';

await decryptFile('./encrypted.key', 'password', 'result.log'); // writes result to 'result.log' file;
```

[build-img]: https://github.com/andr-ii/cryl/actions/workflows/build.yml/badge.svg
[build-url]: https://github.com/andr-ii/cryl/actions/workflows/build.yml
[pkg-img]: https://img.shields.io/badge/version-0.3.0-blue
[pkg-url]: https://github.com/andr-ii/cryl/pkgs/npm/cryl
[coverage-img]: https://coveralls.io/repos/github/andr-ii/cryl/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/andr-ii/cryl?branch=master
