# Ebooks Library

An app to access and read `.epub` ebooks from a web interface.

## Install

### Dependencies

Both server and client apps use Yarn as a package manager. Install it if necessary (`which yarn` should tell you):

```
npm i -g yarn
```

Then, both in `library-client` and `library-server`:

```
yarn
```

### Environment files

The server app uses a `.env` file, located at the root of the `library-server` directory. Copy `.env.sample` as `.env` and edit as needed.

The client app uses a `.env.local` file, located at the root of the `library-client` directory. Copy `.env.local.sample` as `.env.local` and edit as needed.

## Run TypeORM commands

E.g. schema sync:

```
npm run typeorm schema:sync
```

(instead of `npx typeorm schema:sync`)