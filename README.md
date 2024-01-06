# Nouns Amigos web app

## web app for the Nouns Amigos community

**hackea y aprende con amigos mientras construyes cosas divertidas | hack and learn while with friends, while you build cool stuff**

## let's hack!

#### requirements

- nodejs v20.10.0 (lts) or latest
- git
- supabase or planetscale (for postgresql db) [supabase guide](https://supabase.com/docs/guides/database/connecting-to-postgres).

### installation:

clone this repo

```bash
  git clone https://github.com/nouns-amigos/amix-mvp.git
```

change into project dir

```bash
  cd amix-mvp
```

install dependencies

```bash
  bun install
```

_we use bun for this project, you can get more info in [bun's official docs](https://bun.sh/docs/installation)_

### env variables

create a copy of `.env.example` and name it `.env`

modify the following env variables

`DATABASE_URL`

### start the app

```bash
  bun run dev
```

app will start at `http://localhost:3000`

### db migration

run the migration script

```bash
  npx prisma migrate dev
```

you can use prisma studio to explore the db

```bash
  npx prisma studio
```

prisma studio runs at `http://localhost:5050`.

for db changes/updates, follow this flow

1. modify the db schema, location `/prisma/schema.prisma`
2. create migration
3. keep working on the code
4. rinse and repeat in case of another change to the db

you can try out [this guide](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate) to learn more about the development flow when working with prisma

## next steps

this is a wip, you can always reach out at dev@innvertir.com
