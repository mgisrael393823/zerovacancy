/**
 * Import Path Updater
 * 
 * This script updates import paths throughout the codebase to reflect the new directory structure.
 * It works by replacing old import paths with new ones based on the defined mappings.
 * 
 * Usage:
 * node scripts/update-imports.js
 * 
 * To run in dry-run mode (no changes made):
 * node scripts/update-imports.js --dry-run
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

// Define color codes for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Define path mappings (old path -> new path)
const pathMappings = {
  // Creator feature
  '@/components/creator/CreatorCard': '@/features/creators',
  '@/components/creator': '@/features/creators',
  '@/components/features/creator': '@/features/creators',
  
  // Layout feature (example for future)
  '@/components/layout/Footer': '@/layouts/Footer',
  '@/components/layout/Header': '@/layouts/Header',
  
  // Utils 
  '@/utils/performance-optimizations': '@/utils/performance',
  '@/utils/seo-utils': '@/utils/seo',
  
  // Add more mappings as needed
};

// Find all TypeScript and TSX files
console.log(`${colors.blue}Scanning for TypeScript and TSX files...${colors.reset}`);
const files = glob.sync('src/**/*.{ts,tsx}', { ignore: ['node_modules/**', 'src/**/*.d.ts'] });
console.log(`${colors.green}Found ${files.length} files to process${colors.reset}`);

// Statistics
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  totalReplacements: 0,
  mappingsUsed: {}
};

// Initialize mappings used counter
Object.keys(pathMappings).forEach(mapping => {
  stats.mappingsUsed[mapping] = 0;
});

// Process each file
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  let modified = false;
  let fileReplacements = 0;

  // Check for each mapping
  Object.entries(pathMappings).forEach(([oldPath, newPath]) => {
    // Match both single and double quotes
    const singleQuoteRegex = new RegExp(`from ['](${oldPath})['](;?)`, 'g');
    const doubleQuoteRegex = new RegExp(`from ["](${oldPath})["](;?)`, 'g');
    
    // Check single quotes
    if (singleQuoteRegex.test(content)) {
      content = content.replace(singleQuoteRegex, `from '${newPath}'$2`);
      modified = true;
      fileReplacements++;
      stats.mappingsUsed[oldPath]++;
    }
    
    // Reset regex state (important for global regex)
    singleQuoteRegex.lastIndex = 0;
    
    // Check double quotes
    if (doubleQuoteRegex.test(content)) {
      content = content.replace(doubleQuoteRegex, `from "${newPath}"$2`);
      modified = true;
      fileReplacements++;
      stats.mappingsUsed[oldPath]++;
    }
  });

  // Update stats
  stats.filesProcessed++;
  
  // Write the file back if modified and not in dry-run mode
  if (modified) {
    stats.filesModified++;
    stats.totalReplacements += fileReplacements;
    
    console.log(`${colors.cyan}File: ${file}${colors.reset}`);
    console.log(`${colors.yellow}  Made ${fileReplacements} replacements${colors.reset}`);
    
    if (!isDryRun) {
      fs.writeFileSync(file, content);
      console.log(`${colors.green}  Updated file${colors.reset}`);
    } else {
      console.log(`${colors.magenta}  [DRY RUN] No changes written${colors.reset}`);
    }
  }
});

// Print summary
console.log('\n=== Summary ===');
console.log(`${colors.blue}Files processed: ${colors.reset}${stats.filesProcessed}`);
console.log(`${colors.green}Files modified: ${colors.reset}${stats.filesModified}`);
console.log(`${colors.yellow}Total replacements: ${colors.reset}${stats.totalReplacements}`);

// Print usage of each mapping
console.log('\n=== Mapping Usage ===');
Object.entries(stats.mappingsUsed).forEach(([mapping, count]) => {
  if (count > 0) {
    console.log(`${colors.cyan}${mapping} → ${pathMappings[mapping]}${colors.reset}: ${count}`);
  }
});

// Print final message
if (isDryRun) {
  console.log(`\n${colors.magenta}DRY RUN COMPLETED - No files were modified${colors.reset}`);
  console.log(`${colors.magenta}To apply changes, run without the --dry-run flag${colors.reset}`);
} else {
  console.log(`\n${colors.green}COMPLETED - Files have been updated${colors.reset}`);
}