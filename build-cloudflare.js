const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('[Cloudflare Build] Starting Nine Degree Editorial Dashboard build...');

const dashboardDir = path.join(__dirname, 'blog automation', 'dashboard');
console.log(`[Cloudflare Build] Target directory: ${dashboardDir}`);

const nodeModulesExist = fs.existsSync(path.join(dashboardDir, 'node_modules'));
if (!nodeModulesExist) {
  console.log('[Cloudflare Build] Installing dashboard dependencies...');
  try {
    execSync('npm install', { cwd: dashboardDir, stdio: 'inherit' });
  } catch {
    execSync('npm install --ignore-scripts', { cwd: dashboardDir, stdio: 'inherit' });
  }
} else {
  console.log('[Cloudflare Build] Dashboard dependencies already installed.');
}

console.log('[Cloudflare Build] Compiling Vite production bundle...');
execSync('npm run build', { cwd: dashboardDir, stdio: 'inherit' });

const srcDist = path.join(dashboardDir, 'dist');
const targetDist = path.join(__dirname, 'dist');

if (fs.existsSync(srcDist)) {
  fs.cpSync(srcDist, targetDist, { recursive: true, force: true });
  console.log('[Cloudflare Build] Output mirrored to root dist/ directory.');
}

console.log('[Cloudflare Build] Cloudflare Pages build completed successfully!');

