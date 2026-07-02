const fs = require('fs');
const path = require('path');

function fixColors(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixColors(fullPath);
        } else if (/\.(tsx|ts)$/.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // We want to replace text-[#0000FF] and border-[#0000FF] with white to make them visible
            // bg-[#0000FF] can remain as it is (a blue background).
            let newContent = content.replace(/text-\[#0000FF\]/g, 'text-white');
            newContent = newContent.replace(/border-\[#0000FF\]/g, 'border-white');
            newContent = newContent.replace(/text-\[#0000FF\]\/(\d+)/g, 'text-white/$1');
            newContent = newContent.replace(/border-\[#0000FF\]\/(\d+)/g, 'border-white/$1');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

fixColors(path.join(__dirname, 'src'));
