#!/usr/bin/env node
/**
 * Prepare build environment variables for Next.js
 * This script reads NEXT_PUBLIC_* variables from the environment
 * and creates a .env.local file that Next.js can read during build
 */

const fs = require('fs');
const path = require('path');

const envVars = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_DEFAULT_API_URL',
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SENTRY_DSN',
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
];

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = [];

console.log('Preparing build environment variables...');

envVars.forEach((varName) => {
  const value = process.env[varName];
  if (value !== undefined) {
    envContent.push(`${varName}=${value}`);
    console.log(`✓ Found ${varName}`);
  } else {
    console.log(`✗ Missing ${varName}`);
  }
});

if (envContent.length > 0) {
  fs.writeFileSync(envPath, envContent.join('\n') + '\n', 'utf8');
  console.log(`\n✓ Created ${envPath} with ${envContent.length} variables`);
} else {
  console.log('\n⚠ No NEXT_PUBLIC_* variables found in environment');
  // Create empty file to avoid errors
  fs.writeFileSync(envPath, '', 'utf8');
}

