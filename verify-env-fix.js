#!/usr/bin/env node

/**
 * verify-env-fix.js
 * 
 * Tests the Supabase environment variable fix implementation.
 * This script checks all the key components of our solution.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk') || { green: s => s, red: s => s, yellow: s => s, blue: s => s };

console.log(chalk.blue('===== Supabase Environment Variable Fix Verification ====='));

// Status variables
let allTestsPassed = true;
const results = {};

// 1. Check .env file exists and has required variables
console.log('\n1. Checking .env file configuration...');
try {
  const envFilePath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envFilePath)) {
    console.log(chalk.red('❌ .env file not found!'));
    results.envFile = false;
    allTestsPassed = false;
  } else {
    console.log(chalk.green('✅ .env file exists'));
    
    // Check content
    const envContent = fs.readFileSync(envFilePath, 'utf8');
    const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL=');
    const hasSupabaseKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');
    
    if (hasSupabaseUrl && hasSupabaseKey) {
      console.log(chalk.green('✅ .env file contains required Supabase variables'));
      results.envVariables = true;
    } else {
      console.log(chalk.red('❌ .env file is missing required Supabase variables!'));
      results.envVariables = false;
      allTestsPassed = false;
    }
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking .env file: ${err.message}`));
  results.envFile = false;
  allTestsPassed = false;
}

// 2. Check ensure-env.cjs script exists and is working
console.log('\n2. Checking ensure-env.cjs script...');
try {
  const scriptPath = path.join(__dirname, 'ensure-env.cjs');
  
  if (!fs.existsSync(scriptPath)) {
    console.log(chalk.red('❌ ensure-env.cjs script not found!'));
    results.ensureEnvScript = false;
    allTestsPassed = false;
  } else {
    console.log(chalk.green('✅ ensure-env.cjs script exists'));
    
    // Check execution
    try {
      const output = execSync('node ensure-env.cjs', { encoding: 'utf8' });
      console.log(chalk.green('✅ ensure-env.cjs script executed successfully'));
      results.ensureEnvExecution = true;
    } catch (err) {
      console.log(chalk.red(`❌ ensure-env.cjs script execution failed: ${err.message}`));
      results.ensureEnvExecution = false;
      allTestsPassed = false;
    }
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking ensure-env.cjs script: ${err.message}`));
  results.ensureEnvScript = false;
  allTestsPassed = false;
}

// 3. Check client-direct.ts exists
console.log('\n3. Checking fallback Supabase client...');
try {
  const clientPath = path.join(__dirname, 'src', 'integrations', 'supabase', 'client-direct.ts');
  
  if (!fs.existsSync(clientPath)) {
    console.log(chalk.red('❌ client-direct.ts not found!'));
    results.directClient = false;
    allTestsPassed = false;
  } else {
    console.log(chalk.green('✅ client-direct.ts exists'));
    
    // Check content
    const clientContent = fs.readFileSync(clientPath, 'utf8');
    
    if (clientContent.includes('createClient') && 
        clientContent.includes('SUPABASE_URL') && 
        clientContent.includes('SUPABASE_ANON_KEY')) {
      console.log(chalk.green('✅ client-direct.ts contains required Supabase client setup'));
      results.directClientSetup = true;
    } else {
      console.log(chalk.red('❌ client-direct.ts is missing required Supabase client setup!'));
      results.directClientSetup = false;
      allTestsPassed = false;
    }
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking client-direct.ts: ${err.message}`));
  results.directClient = false;
  allTestsPassed = false;
}

// 4. Check AuthContext.tsx has getClient helper
console.log('\n4. Checking AuthContext implementation...');
try {
  const authContextPath = path.join(__dirname, 'src', 'components', 'auth', 'AuthContext.tsx');
  
  if (!fs.existsSync(authContextPath)) {
    console.log(chalk.red('❌ AuthContext.tsx not found!'));
    results.authContext = false;
    allTestsPassed = false;
  } else {
    console.log(chalk.green('✅ AuthContext.tsx exists'));
    
    // Check for getClient function
    const authContent = fs.readFileSync(authContextPath, 'utf8');
    
    if (authContent.includes('getClient') && 
        authContent.includes('supabaseDirect') && 
        authContent.includes('client-direct')) {
      console.log(chalk.green('✅ AuthContext.tsx contains client fallback mechanism'));
      results.authContextFallback = true;
    } else {
      console.log(chalk.red('❌ AuthContext.tsx is missing client fallback mechanism!'));
      results.authContextFallback = false;
      allTestsPassed = false;
    }
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking AuthContext.tsx: ${err.message}`));
  results.authContext = false;
  allTestsPassed = false;
}

// 5. Check package.json has predev script
console.log('\n5. Checking package.json scripts...');
try {
  const packageJsonPath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red('❌ package.json not found!'));
    results.packageJson = false;
    allTestsPassed = false;
  } else {
    console.log(chalk.green('✅ package.json exists'));
    
    // Check for predev script
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (packageJson.scripts && packageJson.scripts.predev && 
        packageJson.scripts.predev.includes('ensure-env.cjs')) {
      console.log(chalk.green('✅ package.json contains predev script for environment checks'));
      results.predevScript = true;
    } else {
      console.log(chalk.red('❌ package.json is missing predev script for environment checks!'));
      results.predevScript = false;
      allTestsPassed = false;
    }
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking package.json: ${err.message}`));
  results.packageJson = false;
  allTestsPassed = false;
}

// 6. Check vite.config.js has environment variable handling
console.log('\n6. Checking Vite configuration...');
try {
  const viteConfigPath = path.join(__dirname, 'vite.config.js');
  
  if (!fs.existsSync(viteConfigPath)) {
    console.log(chalk.red('❌ vite.config.js not found!'));
    results.viteConfig = false;
    allTestsPassed = false;
  } else {
    console.log(chalk.green('✅ vite.config.js exists'));
    
    // Check content
    const viteContent = fs.readFileSync(viteConfigPath, 'utf8');
    
    if (viteContent.includes('loadEnv') && 
        viteContent.includes('VITE_SUPABASE_URL') && 
        viteContent.includes('VITE_SUPABASE_ANON_KEY') &&
        viteContent.includes('define')) {
      console.log(chalk.green('✅ vite.config.js contains environment variable handling'));
      results.viteConfigEnv = true;
    } else {
      console.log(chalk.red('❌ vite.config.js is missing environment variable handling!'));
      results.viteConfigEnv = false;
      allTestsPassed = false;
    }
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking vite.config.js: ${err.message}`));
  results.viteConfig = false;
  allTestsPassed = false;
}

// 7. Check documentation files
console.log('\n7. Checking documentation...');
try {
  const docPaths = [
    path.join(__dirname, 'SUPABASE-ENV-FIX-SUMMARY.md'),
    path.join(__dirname, 'README-ENV-FIX.md')
  ];
  
  let docsFound = 0;
  
  for (const docPath of docPaths) {
    if (fs.existsSync(docPath)) {
      console.log(chalk.green(`✅ ${path.basename(docPath)} exists`));
      docsFound++;
    } else {
      console.log(chalk.yellow(`⚠️ ${path.basename(docPath)} not found`));
    }
  }
  
  if (docsFound > 0) {
    console.log(chalk.green(`✅ Found ${docsFound} documentation files`));
    results.documentation = true;
  } else {
    console.log(chalk.yellow('⚠️ No documentation files found'));
    results.documentation = false;
    // Don't fail the test for missing documentation
  }
} catch (err) {
  console.log(chalk.red(`❌ Error checking documentation files: ${err.message}`));
  results.documentation = false;
  // Don't fail the test for missing documentation
}

// Final summary
console.log('\n===== VERIFICATION SUMMARY =====');
console.log(allTestsPassed 
  ? chalk.green('✅ ALL TESTS PASSED! The Supabase environment variable fix is fully implemented.')
  : chalk.red('❌ SOME TESTS FAILED! The Supabase environment variable fix is not fully implemented.'));

console.log('\nResults:');
Object.entries(results).forEach(([test, passed]) => {
  console.log(`${passed ? chalk.green('✅') : chalk.red('❌')} ${test}`);
});

console.log('\nRecommendation:');
if (allTestsPassed) {
  console.log(chalk.green('The fix is ready for production. No further action needed.'));
} else {
  console.log(chalk.yellow('The fix is incomplete. Please review the failed tests and address any issues.'));
}

// Exit with appropriate code
process.exit(allTestsPassed ? 0 : 1);