#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit', cwd: __dirname });

// Build TypeScript
console.log('Building TypeScript...');
execSync('npx tsc', { stdio: 'inherit', cwd: __dirname });

// Create index.js in the root directory
console.log('Creating executable...');
const indexContent = `#!/usr/bin/env node

import './dist/index.js';
`;

fs.writeFileSync(path.join(__dirname, 'index.js'), indexContent);
fs.chmodSync(path.join(__dirname, 'index.js'), '755');

console.log('Build completed successfully!');
