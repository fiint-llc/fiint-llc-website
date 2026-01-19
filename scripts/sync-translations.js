#!/usr/bin/env node

/**
 * Translation Sync Script
 *
 * Syncs uk.json with en.json structure.
 * - Adds missing keys with [NEEDS TRANSLATION] prefix
 * - Preserves existing translations
 * - Removes keys that don't exist in en.json
 *
 * Usage: node scripts/sync-translations.js
 *
 * Note: For actual Ukrainian translations, you can:
 * 1. Manually translate the [NEEDS TRANSLATION] entries
 * 2. Or use Claude/GPT to generate translations offline
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const enPath = path.join(messagesDir, 'en.json');
const ukPath = path.join(messagesDir, 'uk.json');

const NEEDS_TRANSLATION_PREFIX = '[NEEDS TRANSLATION] ';

function deepMerge(source, target) {
  const result = {};

  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      // Nested object
      result[key] = deepMerge(source[key], target?.[key] || {});
    } else {
      // Leaf value
      if (target?.[key] !== undefined && !target[key].startsWith?.(NEEDS_TRANSLATION_PREFIX)) {
        // Keep existing translation if it doesn't have the prefix
        result[key] = target[key];
      } else {
        // Mark as needing translation
        result[key] = `${NEEDS_TRANSLATION_PREFIX}${source[key]}`;
      }
    }
  }

  return result;
}

function countNeedsTranslation(obj, count = { total: 0 }) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      countNeedsTranslation(obj[key], count);
    } else if (typeof obj[key] === 'string' && obj[key].startsWith(NEEDS_TRANSLATION_PREFIX)) {
      count.total++;
    }
  }
  return count.total;
}

function main() {
  // Load source (English)
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  // Load target (Ukrainian) if exists
  let uk = {};
  if (fs.existsSync(ukPath)) {
    uk = JSON.parse(fs.readFileSync(ukPath, 'utf-8'));
  }

  // Merge (preserving existing translations)
  const synced = deepMerge(en, uk);

  // Count items needing translation
  const needsTranslation = countNeedsTranslation(synced);

  // Write back
  fs.writeFileSync(ukPath, JSON.stringify(synced, null, 2) + '\n');

  console.log('\n✅ Translation sync complete!\n');

  if (needsTranslation > 0) {
    console.log(`⚠️  ${needsTranslation} strings need translation.`);
    console.log(`   Look for "${NEEDS_TRANSLATION_PREFIX}" prefix in uk.json\n`);
  } else {
    console.log('   All strings are translated.\n');
  }
}

main();
