const fs = require('fs');
const path = require('path');

function applyBlueTheme(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            applyBlueTheme(fullPath);
        } else if (/\.(tsx|ts|css)$/.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replace all gold colors with blue
            content = content.replace(/#D4AF37/gi, '#0000FF');
            content = content.replace(/#C7A348/gi, '#0000FF');
            content = content.replace(/#8C765C/gi, '#0000FF');

            // Make text and borders white for contrast against dark backgrounds
            content = content.replace(/text-\[#0000FF\]/g, 'text-white');
            content = content.replace(/text-\[#0000FF\]\/(\d+)/g, 'text-white/$1');
            
            content = content.replace(/border-\[#0000FF\]/g, 'border-white');
            content = content.replace(/border-\[#0000FF\]\/(\d+)/g, 'border-white/$1');
            
            content = content.replace(/ring-\[#0000FF\]/g, 'ring-white');
            content = content.replace(/ring-\[#0000FF\]\/(\d+)/g, 'ring-white/$1');

            // Fix buttons with dark text on blue backgrounds
            let lines = content.split('\n');
            for(let i=0; i<lines.length; i++) {
                if(lines[i].includes('bg-[#0000FF]')) {
                    lines[i] = lines[i].replace(/text-\[#1A1A1A\]/g, 'text-white');
                }
            }
            content = lines.join('\n');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

applyBlueTheme(path.join(__dirname, 'src'));
