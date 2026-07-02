const fs = require('fs');
const path = require('path');

/**
 * Rule: If a section/element has a BLUE background (bg-[#0000FF], gradient with #0000FF, etc.)
 * then ALL text inside it should be WHITE (not blue).
 * If a section has a WHITE background, headings should be blue (#0000FF), body text dark.
 */

function fixContrastIssues(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixContrastIssues(fullPath);
    } else if (/\.(tsx|ts|css)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      // For each line, if it contains a blue background class AND text-[#0000FF], fix to text-white
      // Also look for inline style with blue gradient background
      let lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Case 1: Line has blue bg AND blue text -> text should be white
        if (
          (line.includes('bg-[#0000FF]') || line.includes('#000066') || line.includes('#0000FF 100%')) &&
          line.includes('text-[#0000FF]')
        ) {
          lines[i] = line.replace(/text-\[#0000FF\]/g, 'text-white');
        }
      }
      content = lines.join('\n');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed: ${path.basename(fullPath)}`);
      }
    }
  }
}

fixContrastIssues(path.join(__dirname, 'src'));
console.log('Done!');
