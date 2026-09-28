const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Regex to match the hero container
  const regex = /<div className=\"bg-gradient-to-b from-green-50\/50 to-\\[#F8FAFC\\] (pt-\\d+ pb-\\d+ border-b border-gray-100)\">\\s*<div className=\"([^\"]+)\">/g;

  content = content.replace(regex, (match, p1, p2) => {
    return `<div className="relative ${p1} overflow-hidden bg-[#F8FAFC]">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=85" alt="Clean modern home" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-white/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
          </div>
          <div className="relative z-10 ${p2}">`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

const dir = './src/pages';
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.js')) {
    processFile(path.join(dir, file));
  }
}
