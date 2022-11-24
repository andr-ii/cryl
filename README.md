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

```ts
import { main } from '@andr-ll/cryl';

// TODO
```
