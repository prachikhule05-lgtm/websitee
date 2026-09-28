const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('c:/website_royal_cleaning/websitee/frontend/src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Primary green to Deep Emerald
    content = content.replace(/#166534/gi, '#0B3B2C'); 
    
    // Hover green to Darker Deep Emerald
    content = content.replace(/#14532d/gi, '#07271D'); 
    
    // Accents to Champagne Gold
    content = content.replace(/#22c55e/gi, '#C5A059');

    // Section backgrounds
    content = content.replace(/#F8FAFC/gi, '#F8FAF9');

    // Body texts (some are text-slate-600 which is 475569, let's keep or replace with 64748B)
    content = content.replace(/text-slate-600/g, 'text-[#64748B]');
    content = content.replace(/text-slate-800/g, 'text-[#1E293B]');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated', filePath);
    }
  }
});
console.log("Done global colors");
