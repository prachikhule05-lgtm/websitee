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

    // Navy to Dark Green (primary)
    content = content.replace(/#0B2545/gi, '#166534'); 
    
    // Blue hover to Darker Green
    content = content.replace(/#134074/gi, '#14532d'); 
    
    // Amber to Vibrant Green
    content = content.replace(/#F59E0B/gi, '#22c55e');

    // Handle tailwind classes if any were hardcoded
    content = content.replace(/bg-blue-100/g, 'bg-green-100');
    content = content.replace(/bg-blue-50/g, 'bg-green-50');
    content = content.replace(/bg-amber-100/g, 'bg-emerald-100');
    content = content.replace(/text-blue-/g, 'text-green-');
    content = content.replace(/text-amber-/g, 'text-emerald-');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated', filePath);
    }
  }
});
console.log("Done");
