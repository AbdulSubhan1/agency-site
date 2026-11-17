# Agency site

The public website of an AI automation agency that helps businesses streamline their processes with AI. One Next.js
codebase serves two brands:

| Brand | Market                   | `BRAND` |
| ----- | ------------------------ | ------- |
| US    | United States            | `us`    |
| Asia  | UAE first, then Pakistan | `asia`  |

Each brand is its own Vercel project built from this repo with a different `BRAND`. Leads go to the agency CRM.

## Run it

```bash
npm install
cp .env.example .env.local   # set BRAND=us or BRAND=asia
npm run dev
```

## Check it

```bash
npm run check
```

## Read next

- [AGENTS.md](AGENTS.md): the coding standard
- [docs/kb/README.md](docs/kb/README.md): the knowledge base
