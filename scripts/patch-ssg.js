import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../node_modules/vite-react-ssg');

function patchFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    if (content.includes('react-router-dom/server.js')) {
      content = content.replace(/react-router-dom\/server\.js/g, 'react-router');
      modified = true;
    }
    if (content.includes('react-router-dom/server')) {
      content = content.replace(/react-router-dom\/server/g, 'react-router');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[patch-ssg] Patched: ${path.relative(targetDir, filePath)}`);
    }
  } catch (err) {
    console.error(`[patch-ssg] Error processing ${filePath}:`, err);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`[patch-ssg] Target directory does not exist: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      patchFile(fullPath);
    }
  }
}

console.log('[patch-ssg] Scanning vite-react-ssg for react-router-dom server imports...');
scanDir(targetDir);
console.log('[patch-ssg] Done.');
