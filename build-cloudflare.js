const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('[Cloudflare Build] Starting Nine Degree Editorial Dashboard build...');

const dashboardDir = path.join(__dirname, 'blog automation', 'dashboard');
console.log(`[Cloudflare Build] Target directory: ${dashboardDir}`);

execSync('npm install', { cwd: dashboardDir, stdio: 'inherit' });
execSync('npm run build', { cwd: dashboardDir, stdio: 'inherit' });

const srcDist = path.join(dashboardDir, 'dist');
const targetDist = path.join(__dirname, 'dist');

if (fs.existsSync(srcDist)) {
  fs.cpSync(srcDist, targetDist, { recursive: true, force: true });
  console.log('[Cloudflare Build] Output mirrored to root dist/ directory.');
}

console.log('[Cloudflare Build] Cloudflare Pages build completed successfully!');
