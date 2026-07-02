const fs = require('fs');
const path = require('path');

// Fix 1: In SEO page.tsx files - buttons that are `border-white bg-white/10 text-white` 
//         on dark (navy) backgrounds - these are FINE, skip them
// Fix 2: In SEO page.tsx files - headings with text-white on white/F7F8FC backgrounds

// The real problem: sections with bg-white or bg-[#F7F8FC] that have text-white headings
// We need to check the whole component context

function fixSeoPages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixSeoPages(fullPath);
    } else if (/page\.tsx$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      // Find sections/divs with bg-white or bg-[#F7F8FC] that contain text-white headings
      // Strategy: parse line by line, track if we're in a light background container
      let lines = content.split('\n');
      let inLightBgSection = false;
      let lightBgDepth = 0;
      let braceDepth = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Count JSX depth roughly by < and > chars
        const hasLightBg = line.includes('bg-white"') || line.includes('bg-white ') || 
                           line.includes("bg-white'") || line.includes('bg-[#F7F8FC]') ||
                           line.includes('bg-[#f7f8fc]');
        const hasDarkBg = line.includes('bg-[#1B2B5E]') || line.includes('bg-[#0F1F4B]') ||
                          line.includes('bg-[#0000FF]') || line.includes('bg-black') ||
                          line.includes('bg-white/[0.0') || line.includes('bg-white/10') ||
                          line.includes('bg-white/5') || line.includes('linear-gradient');
        
        if (hasLightBg && !hasDarkBg) {
          inLightBgSection = true;
          lightBgDepth = 0;
        }

        if (inLightBgSection) {
          // If line has a heading with text-white (not a button), fix it
          if (/<h[1-6][^>]*text-white[^/]/.test(line) || 
              /className="[^"]*text-white[^"]*"[^>]*>/.test(line) && line.includes('font-vibes')) {
            // Only fix if NOT in a button or overlay context
            if (!line.includes('bg-[#0000FF]') && !line.includes('border-white') && 
                !line.includes('bg-white/') && !line.includes('rounded-full')) {
              lines[i] = line.replace(/\btext-white\b/g, 'text-[#0000FF]');
            }
          }
        }
      }
      content = lines.join('\n');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

fixSeoPages(path.join(__dirname, 'src'));
console.log('Done!');
