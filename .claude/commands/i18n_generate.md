Generate or improve Ukrainian translations in `src/messages/ua.json` based on `src/messages/en.json`.

## Translation Quality Guidelines

**Write natural Ukrainian, not literal translations:**

- Adapt sentence structure to Ukrainian grammar (word order, cases, verb aspects)
- Use native Ukrainian expressions instead of calques from English
- Avoid awkward constructions that "sound translated"
- Marketing copy should feel like it was written by a Ukrainian copywriter

**Specific guidance:**

- "We build" → "Ми створюємо" (not "Ми будуємо" which sounds odd for software)
- Avoid excessive use of "ваш/ваша/ваше" — Ukrainian often omits possessives where English requires them
- Use active voice naturally but don't force it where passive sounds more natural in Ukrainian
- Technical terms: keep English names for technologies (React, TypeScript) but translate descriptions
- "Get in Touch" → "Зв'яжіться з нами" or "Напишіть нам" (natural CTA, not literal)
- Avoid translating idioms word-for-word — find Ukrainian equivalents

**Tone:**

- Professional but approachable (same as English)
- Avoid overly formal "ви" constructions that sound bureaucratic
- Keep the confident, direct tone of the English copy

## Workflow

1. Read both `src/messages/en.json` and `src/messages/ua.json`
2. Identify missing keys OR review existing translations for quality
3. Generate natural Ukrainian translations
4. Run `pnpm i18n:sync` and `pnpm i18n:check` to verify
5. If improving existing translations, explain what was changed and why
