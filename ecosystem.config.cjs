const fs = require('node:fs');
const path = require('node:path');

const nvmrcPath = path.join(process.cwd(), '.nvmrc');
let nodeVersion;

try {
  nodeVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
} catch (error) {
  console.error('Ошибка чтения .nvmrc:', error.message);
  process.exit(1);
}

module.exports = {
  apps: [{
    name: 'random_image_api',
    script: 'npm',
    args: 'start',
    interpreter: `node@${nodeVersion}`,
    autorestart: true,
    env: {
      NODE_ENV: 'production',
    },
  }],
};
