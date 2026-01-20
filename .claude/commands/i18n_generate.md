Generate missing translations for Ukrainian (`src/messages/ua.json`). If the file does not exist, create it based on `src/messages/en.json`.

Use English as the source of truth and do not hardcode user-facing strings outside message files.

If you add or update keys, run `pnpm i18n:sync` and `pnpm i18n:check` as part of the workflow.
