const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      c = c.replace(/bg-brand-light/g, 'bg-brand-bg')
           .replace(/text-brand-dark/g, 'text-brand-text')
           .replace(/bg-white/g, 'bg-brand-card')
           .replace(/bg-gray-50/g, 'bg-brand-bg')
           .replace(/text-gray-800/g, 'text-brand-text');
      fs.writeFileSync(p, c);
    }
  }
}
walk('./src');
