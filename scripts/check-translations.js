#!/usr/bin/env node

/**
 * Translation Check Script
 *
 * Compares en.json (source of truth) with ua.json
 * and reports missing or extra keys.
 *
 * Usage: node scripts/check-translations.js
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const enPath = path.join(messagesDir, 'en.json');
const ukPath = path.join(messagesDir, 'ua.json');

function flattenObject(obj, prefix = '') {
  const result = {};

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], fullKey));
    } else {
      result[fullKey] = obj[key];
    }
  }

  return result;
}

function main() {
  // Load message files
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const ua = JSON.parse(fs.readFileSync(ukPath, 'utf-8'));

  // Flatten both
  const enKeys = flattenObject(en);
  const ukKeys = flattenObject(ua);

  const enKeySet = new Set(Object.keys(enKeys));
  const ukKeySet = new Set(Object.keys(ukKeys));

  // Find missing in UK
  const missingInUk = [...enKeySet].filter((k) => !ukKeySet.has(k));

  // Find extra in UK
  const extraInUk = [...ukKeySet].filter((k) => !enKeySet.has(k));

  // Report
  console.log('\n📋 Translation Check Report\n');
  console.log(`English keys: ${enKeySet.size}`);
  console.log(`Ukrainian keys: ${ukKeySet.size}`);

  if (missingInUk.length === 0 && extraInUk.length === 0) {
    console.log('\n✅ All translations are in sync!\n');
    process.exit(0);
  }

  if (missingInUk.length > 0) {
    console.log(`\n❌ Missing in ua.json (${missingInUk.length} keys):`);
    missingInUk.forEach((k) => console.log(`   - ${k}`));
  }

  if (extraInUk.length > 0) {
    console.log(`\n⚠️  Extra in ua.json (${extraInUk.length} keys):`);
    extraInUk.forEach((k) => console.log(`   - ${k}`));
  }

  console.log('\nRun `pnpm i18n:sync` to fix missing keys.\n');
  process.exit(1);
}

main();
