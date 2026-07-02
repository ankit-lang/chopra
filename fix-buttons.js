const fs = require('fs');
const path = require('path');

function fixBlueButtons(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixBlueButtons(fullPath);
        } else if (/\.(tsx|ts)$/.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // A bit risky to regex replace, let's just replace text-[#1A1A1A] with text-white
            // ONLY if bg-[#0000FF] is also present on the same line or nearby.
            // Since classNames are usually on one line, we can do line by line.
            
            let lines = content.split('\n');
            let changed = false;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('bg-[#0000FF]') && lines[i].includes('text-[#1A1A1A]')) {
                    lines[i] = lines[i].replace(/text-\[#1A1A1A\]/g, 'text-white');
                    changed = true;
                }
            }
            
            if (changed) {
                fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

fixBlueButtons(path.join(__dirname, 'src'));
