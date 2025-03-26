/**
 * Repository Structure Verification
 * 
 * This script verifies that the codebase follows the defined structure guidelines.
 * It checks for:
 * 1. Proper directory organization
 * 2. Correct import patterns
 * 3. File naming conventions
 * 4. Required files in each directory
 * 
 * Usage:
 * node scripts/verify-structure.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define color codes for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Expected directory structure
const expectedDirectories = [
  'src/assets',
  'src/components/ui',
  'src/config',
  'src/features',
  'src/hooks',
  'src/layouts',
  'src/lib',
  'src/pages',
  'src/services',
  'src/styles',
  'src/types',
  'src/utils'
];

// Expected feature directories
const expectedFeatures = [
  'src/features/auth',
  'src/features/blog',
  'src/features/creators',
  'src/features/marketplace',
  'src/features/payments',
  'src/features/search'
];

// Required files in feature directories
const requiredFeatureFiles = [
  'index.ts',
  'types.ts'
];

// Required directories in feature directories
const requiredFeatureDirectories = [
  'components'
];

// Regular expressions for deprecated import patterns
const deprecatedImportPatterns = [
  // Relative imports that go up multiple levels
  /from\s+['"]\.\.\/\.\.\/\.\.\/[^'"]+['"]/,
  // Imports from deprecated components
  /from\s+['"]@\/components\/deprecated/
];

// Regular expressions for required import patterns
const requiredImportPatterns = [
  // Using absolute imports with @ prefix
  /from\s+['"]@\//
];

// Regular expressions for file naming patterns
const fileNamingPatterns = {
  components: /^[A-Z][A-Za-z0-9]*\.tsx$/, // PascalCase for component files
  types: /^[a-z][a-zA-Z0-9]*\.ts$/, // camelCase for type files
  utils: /^[a-z][a-zA-Z0-9]*\.ts$/, // camelCase for utility files
  hooks: /^use[A-Z][a-zA-Z0-9]*\.ts$/ // useXxx for hook files
};

// Function to verify directory exists
function verifyDirectory(directory) {
  try {
    const stats = fs.statSync(directory);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

// Function to verify file exists
function verifyFile(file) {
  try {
    const stats = fs.statSync(file);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}

// Function to check if a string matches any of the patterns
function matchesAnyPattern(str, patterns) {
  return patterns.some(pattern => pattern.test(str));
}

// Function to validate import statements in a file
function validateImports(filePath) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Check each line
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for import statements
      if (line.includes('import') && line.includes('from')) {
        // Check for deprecated patterns
        deprecatedImportPatterns.forEach(pattern => {
          if (pattern.test(line)) {
            issues.push({
              type: 'deprecated-import',
              message: `Deprecated import pattern found: ${line.trim()}`,
              line: lineNumber
            });
          }
        });
        
        // Check for required patterns in new files
        // Only check files in the new structure
        if (filePath.includes('/features/') || filePath.includes('/layouts/') || 
            filePath.includes('/lib/') || filePath.includes('/utils/performance/')) {
          let hasRequiredPattern = false;
          
          requiredImportPatterns.forEach(pattern => {
            if (pattern.test(line)) {
              hasRequiredPattern = true;
            }
          });
          
          if (line.includes('from') && !line.includes('from ".') && !line.includes("from '.") && !hasRequiredPattern) {
            issues.push({
              type: 'missing-required-import-pattern',
              message: `Missing required import pattern (@/): ${line.trim()}`,
              line: lineNumber
            });
          }
        }
      }
    });
  } catch (error) {
    issues.push({
      type: 'file-read-error',
      message: `Error reading file: ${error.message}`
    });
  }
  
  return issues;
}

// Function to validate file naming
function validateFileNaming(filePath) {
  const issues = [];
  const fileName = path.basename(filePath);
  
  // Check components
  if (filePath.includes('/components/') && filePath.endsWith('.tsx')) {
    if (!fileNamingPatterns.components.test(fileName)) {
      issues.push({
        type: 'invalid-component-name',
        message: `Component file name should be PascalCase: ${fileName}`
      });
    }
  }
  
  // Check hooks
  if (filePath.includes('/hooks/') && filePath.endsWith('.ts') && !filePath.endsWith('index.ts')) {
    if (!fileNamingPatterns.hooks.test(fileName)) {
      issues.push({
        type: 'invalid-hook-name',
        message: `Hook file name should start with 'use' followed by PascalCase: ${fileName}`
      });
    }
  }
  
  // Check utils
  if (filePath.includes('/utils/') && filePath.endsWith('.ts') && !filePath.endsWith('index.ts')) {
    if (!fileNamingPatterns.utils.test(fileName)) {
      issues.push({
        type: 'invalid-util-name',
        message: `Utility file name should be camelCase: ${fileName}`
      });
    }
  }
  
  return issues;
}

// Main verification function
function verifyStructure() {
  let hasErrors = false;
  
  // Check for expected directories
  console.log(`${colors.blue}Checking expected directories...${colors.reset}`);
  
  expectedDirectories.forEach(directory => {
    if (verifyDirectory(directory)) {
      console.log(`${colors.green}✓ ${directory} exists${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ ${directory} missing${colors.reset}`);
      hasErrors = true;
    }
  });
  
  // Check feature directories
  console.log(`\n${colors.blue}Checking feature directories...${colors.reset}`);
  
  expectedFeatures.forEach(feature => {
    if (verifyDirectory(feature)) {
      console.log(`${colors.green}✓ ${feature} exists${colors.reset}`);
      
      // Check required files in feature directory
      let featureHasErrors = false;
      
      requiredFeatureFiles.forEach(file => {
        const filePath = path.join(feature, file);
        if (verifyFile(filePath)) {
          console.log(`  ${colors.green}✓ ${file} exists${colors.reset}`);
        } else {
          console.log(`  ${colors.red}✗ ${file} missing${colors.reset}`);
          featureHasErrors = true;
        }
      });
      
      // Check required directories in feature directory
      requiredFeatureDirectories.forEach(dir => {
        const dirPath = path.join(feature, dir);
        if (verifyDirectory(dirPath)) {
          console.log(`  ${colors.green}✓ ${dir}/ exists${colors.reset}`);
        } else {
          console.log(`  ${colors.red}✗ ${dir}/ missing${colors.reset}`);
          featureHasErrors = true;
        }
      });
      
      if (featureHasErrors) {
        hasErrors = true;
      }
    } else {
      // For new project structure, some features may not exist yet
      console.log(`${colors.yellow}! ${feature} does not exist yet${colors.reset}`);
    }
  });
  
  // Validate import patterns
  console.log(`\n${colors.blue}Validating import patterns...${colors.reset}`);
  
  // First, validate in the new structure directories
  const newStructureFiles = glob.sync('src/{features,layouts,lib,utils/performance}/**/*.{ts,tsx}', { ignore: ['**/node_modules/**', '**/*.d.ts'] });
  
  let importIssuesCount = 0;
  
  newStructureFiles.forEach(file => {
    const issues = validateImports(file);
    
    if (issues.length > 0) {
      console.log(`${colors.yellow}Issues in ${file}:${colors.reset}`);
      issues.forEach(issue => {
        console.log(`  ${colors.red}✗ Line ${issue.line}: ${issue.message}${colors.reset}`);
        importIssuesCount++;
      });
    }
  });
  
  if (importIssuesCount === 0) {
    console.log(`${colors.green}✓ No import issues found in new structure${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Found ${importIssuesCount} import issues${colors.reset}`);
    hasErrors = true;
  }
  
  // Validate file naming
  console.log(`\n${colors.blue}Validating file naming conventions...${colors.reset}`);
  
  const allFiles = glob.sync('src/**/*.{ts,tsx}', { ignore: ['**/node_modules/**', '**/*.d.ts'] });
  
  let namingIssuesCount = 0;
  
  allFiles.forEach(file => {
    const issues = validateFileNaming(file);
    
    if (issues.length > 0) {
      console.log(`${colors.yellow}Naming issues in ${file}:${colors.reset}`);
      issues.forEach(issue => {
        console.log(`  ${colors.red}✗ ${issue.message}${colors.reset}`);
        namingIssuesCount++;
      });
    }
  });
  
  if (namingIssuesCount === 0) {
    console.log(`${colors.green}✓ No file naming issues found${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Found ${namingIssuesCount} file naming issues${colors.reset}`);
    hasErrors = true;
  }
  
  // Print final summary
  console.log(`\n${colors.blue}=== Summary ====${colors.reset}`);
  
  if (hasErrors) {
    console.log(`${colors.red}✗ Structure verification failed${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.green}✓ Structure verification passed${colors.reset}`);
    process.exit(0);
  }
}

// Run the verification
verifyStructure();