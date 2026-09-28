const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const replaceColors = () => {
    const srcPath = 'c:/website_royal_cleaning/websitee/frontend/src';
    const files = walkSync(srcPath);

    const replacements = {
        '#166534': '#F59E0B',
        '#14532d': '#D97706',
        'emerald-700': 'amber-600',
        'emerald-600': 'amber-500',
        'emerald-500': 'amber-500',
        'emerald-100': 'amber-100',
        'emerald-50': 'amber-50',
        'emerald-200': 'amber-200',
        '#10B981': '#F59E0B',
        '#2563EB': '#D97706',
        'blue-600': 'amber-600',
        'blue-50': 'amber-50',
    };

    let changedFiles = 0;

    files.forEach(file => {
        if (!file.endsWith('.js') && !file.endsWith('.jsx') && !file.endsWith('.css')) return;

        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        for (const [key, value] of Object.entries(replacements)) {
            newContent = newContent.split(key).join(value);
        }

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            changedFiles++;
        }
    });

    console.log(`Updated ${changedFiles} files.`);
}

replaceColors();
