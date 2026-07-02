const fs = require('fs');
const path = require('path');

// Files where white text is intentional (dark/image backgrounds)
const DARK_BG_FILES = [
  'HeroSection.tsx',
  'MenuHeroSection.tsx',
  'CateringBanner.tsx',
  'Header.tsx',
  'TopBar.tsx',
  'Footer.tsx',
  'ReviewsSection.tsx',    // dark navy bg
  'WhySection.tsx',        // dark bg
  'StorySection.tsx',      // dark bg
  'LocationSection.tsx',   // dark bg
  'FinalCta.tsx',          // dark bg
  'VacancyForm.tsx',       // dark bg
  'CateringForm.tsx',      // dark bg
];

function fixInvisibleText(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixInvisibleText(fullPath);
    } else if (/\.(tsx|ts)$/.test(fullPath)) {
      const basename = path.basename(fullPath);
      
      // Skip files with intentionally dark backgrounds
      if (DARK_BG_FILES.includes(basename)) continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      // 1. Fix heading text-white -> text-[#0000FF] (headings on white bg are invisible)
      // Match h1/h2/h3/h4 JSX tags that contain text-white
      content = content.replace(/<h([1-6])\s([^>]*?)text-white([^>]*?)>/g, (match, level, before, after) => {
        return `<h${level} ${before}text-[#0000FF]${after}>`;
      });

      // 2. Fix generic text-white in className strings that are on light backgrounds
      // Replace text-white that is NOT inside a dark bg or overlay context
      // Strategy: replace standalone text-white (not text-white/XX which is semi-transparent overlay)
      // Check line by line - if line has bg-white or bg-[#F7F8FC] on same component, fix it
      let lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Skip if this is a dark overlay or button with dark bg
        if (line.includes('bg-[#1B2B5E]') || 
            line.includes('bg-[#0F1F4B]') || 
            line.includes('bg-[#0000FF]') ||
            line.includes('bg-black') ||
            line.includes('bg-white/') ||
            line.includes('bg-[#0a0a0a]')) continue;

        // If heading tag with text-white (catches remaining ones)
        if (/<h[1-6][^>]*text-white[^/]/.test(line)) {
          lines[i] = line.replace(/text-white\b(?!\/)/g, 'text-[#0000FF]');
        }
      }
      content = lines.join('\n');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${basename}`);
      }
    }
  }
}

fixInvisibleText(path.join(__dirname, 'src'));
console.log('Done!');
