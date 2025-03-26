/**
 * Component Analyzer
 * 
 * This script analyzes the component structure of the codebase and outputs:
 * 1. A list of all components and their locations
 * 2. Import dependencies for each component
 * 3. Usage patterns (where components are imported)
 * 
 * To run:
 * node scripts/analyze-components.js > component-analysis.md
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const COMPONENT_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const EXCLUDE_DIRS = ['node_modules', 'build', 'dist', 'public'];
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

// Output formatting
const componentInventory = [];
const componentImports = {};
const componentUsage = {};

// Helper to check if a file is a component
function isComponentFile(filePath) {
  const ext = path.extname(filePath);
  return COMPONENT_EXTENSIONS.includes(ext);
}

// Helper to extract component name from file path
function getComponentNameFromPath(filePath) {
  const fileName = path.basename(filePath);
  return path.parse(fileName).name;
}

// Find all component files
function findComponentFiles(dir, componentFiles = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory() && !EXCLUDE_DIRS.includes(file)) {
      findComponentFiles(filePath, componentFiles);
    } else if (isComponentFile(filePath)) {
      componentFiles.push(filePath);
    }
  });
  
  return componentFiles;
}

// Extract imports from a component file
function extractImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importLines = content.match(/import\s+.*?from\s+['"].*?['"]/g) || [];
    
    return importLines.map(line => {
      const importMatch = line.match(/from\s+['"](.+?)['"]/);
      if (importMatch && importMatch[1]) {
        return importMatch[1];
      }
      return null;
    }).filter(Boolean);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Find where a component is used
function findComponentUsage(componentName, allFiles) {
  return new Promise((resolve, reject) => {
    // Use grep to find imports of this component across all files
    const grepCmd = `grep -r "import.*${componentName}.*from" --include="*.{ts,tsx,js,jsx}" ${SRC_DIR}`;
    
    exec(grepCmd, (error, stdout, stderr) => {
      if (error && error.code !== 1) { // grep returns 1 if no matches found
        console.error(`Error finding usage for ${componentName}:`, stderr);
        resolve([]);
        return;
      }
      
      const usageFiles = stdout.split('\n')
        .filter(Boolean)
        .map(line => {
          const filePath = line.split(':')[0];
          return filePath;
        })
        .filter(filePath => filePath !== componentName); // Exclude self-imports
      
      resolve(usageFiles);
    });
  });
}

// Analysis function
async function analyzeComponents() {
  console.log('# Component Analysis\n');
  console.log('This document provides an inventory of components in the codebase.\n');
  
  // 1. Find all component files
  const componentFiles = findComponentFiles(COMPONENTS_DIR);
  
  // 2. Create inventory and extract imports
  componentFiles.forEach(filePath => {
    const componentName = getComponentNameFromPath(filePath);
    const relativePath = path.relative(SRC_DIR, filePath);
    
    componentInventory.push({
      name: componentName,
      path: relativePath,
      directory: path.dirname(relativePath)
    });
    
    componentImports[componentName] = extractImports(filePath);
  });
  
  // 3. Find component usage
  for (const component of componentInventory) {
    componentUsage[component.name] = await findComponentUsage(component.name, componentFiles);
  }
  
  // 4. Output inventory
  console.log('## Component Inventory\n');
  console.log('| Component | Directory | Usage Count |');
  console.log('|-----------|-----------|-------------|');
  
  componentInventory.forEach(component => {
    const usageCount = componentUsage[component.name]?.length || 0;
    console.log(`| ${component.name} | ${component.directory} | ${usageCount} |`);
  });
  
  // 5. Output detailed component analysis
  console.log('\n## Detailed Component Analysis\n');
  
  componentInventory.forEach(component => {
    console.log(`### ${component.name}\n`);
    console.log(`**Path:** ${component.path}\n`);
    
    // Imports
    console.log('**Imports:**\n');
    if (componentImports[component.name]?.length) {
      componentImports[component.name].forEach(imp => {
        console.log(`- ${imp}`);
      });
    } else {
      console.log('*No imports*');
    }
    console.log('');
    
    // Used by
    console.log('**Used by:**\n');
    if (componentUsage[component.name]?.length) {
      componentUsage[component.name].forEach(usage => {
        console.log(`- ${path.relative(SRC_DIR, usage)}`);
      });
    } else {
      console.log('*Not imported by other components*');
    }
    console.log('\n---\n');
  });
  
  // 6. Output recommendations
  console.log('## Organization Recommendations\n');
  
  // Identify potential layout components
  const potentialLayoutComponents = componentInventory.filter(component => {
    const name = component.name.toLowerCase();
    return (
      name.includes('header') || 
      name.includes('footer') || 
      name.includes('layout') || 
      name.includes('navigation') ||
      name.includes('seo')
    );
  });
  
  console.log('### Potential Layout Components\n');
  potentialLayoutComponents.forEach(component => {
    console.log(`- \`${component.name}\` (${component.path})`);
  });
  console.log('');
  
  // Identify potentially unused components
  const unusedComponents = componentInventory.filter(component => {
    return !componentUsage[component.name]?.length;
  });
  
  console.log('### Potentially Unused Components\n');
  unusedComponents.forEach(component => {
    console.log(`- \`${component.name}\` (${component.path})`);
  });
  
  // Identify components with multiple usages (shared)
  const sharedComponents = componentInventory.filter(component => {
    return (componentUsage[component.name]?.length || 0) > 2;
  }).sort((a, b) => {
    return (componentUsage[b.name]?.length || 0) - (componentUsage[a.name]?.length || 0);
  });
  
  console.log('\n### Widely Used Components\n');
  sharedComponents.forEach(component => {
    console.log(`- \`${component.name}\` (${component.path}) - Used in ${componentUsage[component.name]?.length} places`);
  });
}

// Run the analysis
analyzeComponents().catch(console.error);

// Export nothing for ESM compatibility
export {};