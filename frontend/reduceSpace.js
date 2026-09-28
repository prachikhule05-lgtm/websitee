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

const reduceSpaces = () => {
    const srcPath = 'c:/website_royal_cleaning/websitee/frontend/src';
    const files = walkSync(srcPath);

    const replacements = {
        'min-h-screen': 'min-h-[70vh]', // Or remove it where possible, but this is safer
        'py-20': 'py-10',
        'py-24': 'py-12',
        'py-32': 'py-12',
        'pb-32': 'pb-12',
        'pb-20': 'pb-10',
        'pt-20': 'pt-10',
        'mt-20': 'mt-10',
        'mb-20': 'mb-10',
        'gap-20': 'gap-10',
        'gap-16': 'gap-8',
        'mb-12': 'mb-6',
        'mt-12': 'mt-6',
        'py-16': 'py-8',
    };

    let changedFiles = 0;

    files.forEach(file => {
        if (!file.endsWith('.js') && !file.endsWith('.jsx')) return;

        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        for (const [key, value] of Object.entries(replacements)) {
            // Replace word bounded class names
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            newContent = newContent.replace(regex, value);
        }

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            changedFiles++;
        }
    });

    console.log(`Updated ${changedFiles} files to reduce empty spaces.`);
}

reduceSpaces();
