import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/app/pages');

// Helper to recursively get all files
const getAllTsxFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
};

// We will replace huge text sizes and thick borders with smaller ones
const replaceMap = [
  // Typography sizes
  [/text-9xl/g, 'text-4xl md:text-5xl'],
  [/text-8xl/g, 'text-3xl md:text-4xl'],
  [/text-7xl/g, 'text-3xl md:text-4xl'],
  [/text-6xl/g, 'text-2xl md:text-3xl'],
  [/text-5xl/g, 'text-xl md:text-2xl'],
  [/text-4xl/g, 'text-xl md:text-2xl'],
  [/text-3xl/g, 'text-lg md:text-xl'],
  [/text-2xl/g, 'text-lg md:text-xl'],
  // Font weights and tracking
  [/font-black/g, 'font-bold'],
  [/tracking-tighter/g, 'tracking-normal'],
  [/tracking-\[?.+?\]?/g, 'tracking-wide'], // e.g. tracking-[0.8em], tracking-[0.5em]
  // Padding & margins
  [/p-40/g, 'p-12 md:p-16'],
  [/p-20/g, 'p-8 md:p-12'],
  [/p-16/g, 'p-6 md:p-8'],
  [/p-12/g, 'p-6'],
  [/px-24/g, 'px-8'],
  [/px-16/g, 'px-6'],
  [/py-10/g, 'py-3'],
  [/py-8/g, 'py-3'],
  [/gap-24/g, 'gap-8'],
  [/gap-16/g, 'gap-6'],
  [/gap-12/g, 'gap-6'],
  [/space-y-32/g, 'space-y-12'],
  [/space-y-24/g, 'space-y-10'],
  [/space-y-16/g, 'space-y-8'],
  [/space-y-12/g, 'space-y-6'],
  [/space-y-8/g, 'space-y-4'],
  [/h-\[800px\]/g, 'h-[400px] md:h-[500px]'],
  [/h-\[650px\]/g, 'h-[350px] md:h-[400px]'],
  // Borders
  [/border-b-\[32px\]/g, 'border-b-4'],
  [/border-b-\[24px\]/g, 'border-b-4'],
  [/border-\[16px\]/g, 'border-2'],
  [/border-l-\[32px\]/g, 'border-l-4'],
  [/border-l-\[16px\]/g, 'border-l-4'],
  [/border-l-\[12px\]/g, 'border-l-4'],
  [/border-b-\[16px\]/g, 'border-b-2'],
  [/border-t-\[12px\]/g, 'border-t-2'],
  [/border-\[12px\]/g, 'border-2'],
  [/border-8/g, 'border-2'],
  [/border-x-\[12px\]/g, 'border-x-4'],
  [/border-y-\[32px\]/g, 'border-y-4'],
  [/border-\[8px\]/g, 'border-2'],
  // Sizes
  [/size-64/g, 'size-24'],
  [/size-32/g, 'size-12'],
  [/size-24/g, 'size-12'],
  [/size-20/g, 'size-10'],
  // Shadows & styling (making it slightly softer but still structured)
  [/shadow-bhagva-flat/g, 'shadow-md rounded-lg'],
  [/shadow-2xl/g, 'shadow-lg'],
  [/italic/g, ''], // Remove excessive italic
  [/uppercase/g, ''], // Remove excessive uppercase if needed (we'll keep some though, actually let's just tone down the classes)
  [/gray-950/g, 'slate-800'],
  [/bg-primary\/5/g, 'bg-primary/5 rounded-lg']
];

const files = getAllTsxFiles(pagesDir);
let changedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  for (const [regex, replacement] of replaceMap) {
    newContent = newContent.replace(regex, replacement);
  }
  
  // Clean up excessive tracking-wide tracking-wide...
  newContent = newContent.replace(/(tracking-wide\s*)+/g, 'tracking-wide ');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`Done! Updated ${changedCount} files.`);
