# Elncr

# Brief Tech
<p>Im using monorepo that place both front-end and back-end within the same project (as for tool i use nx to manage it).</p>
<p>Backend: Nestjs</p>
<p>Frontend: Nextjs</p>

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

<h2>Set up</h2>

```Note: This project uses pnpm as package manager```
```npm install -g pnpm```
```pnpm install -g nx```

<b>node version: 18.16.1</b>

1. Install dependencies

```pnpm i```

2. Setting up db

```PostgreSQL```
```version 15+```

3. Setting up all the environment variables

```./apps/api/.env.example -> ./apps/api/.env```

```./apps/web-client/.env.example -> ./apps/web-client/.env```

4. Run the migrations

``nx run api:run-migrations``

5. Run seed

``nx run api:run-seeds``

6. Run the project

```nx run-many --target=serve --projects=api,web-client --parallel=2```
