// Comprehensive test for both standard and fallback Supabase clients
// Run with: node test-supabase-clients.mjs

import { createClient } from '@supabase/supabase-js';

// Test 1: Try to use environment variables (may not work if env vars not loaded)
console.log('Test 1: Testing with import.meta.env (standard client approach)');
try {
  // This might fail in a Node.js script since import.meta.env is Vite-specific
  const envVars = process.env;
  const supabaseUrl = envVars.VITE_SUPABASE_URL;
  const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;
  
  console.log(`ENV URL: ${supabaseUrl ? supabaseUrl : 'Not found'}`);
  console.log(`ENV KEY: ${supabaseKey ? '[HIDDEN]' : 'Not found'}`);
  
  if (supabaseUrl && supabaseKey) {
    const standardClient = createClient(supabaseUrl, supabaseKey);
    console.log('Standard client created successfully');
    
    // Test the connection
    const { data, error } = await standardClient.auth.getSession();
    if (error) {
      throw error;
    }
    console.log('Standard client connection test: PASSED ✅');
  } else {
    console.log('Cannot create standard client - environment variables not available');
    console.log('This is expected in a Node.js script, would be handled by our fallback');
  }
} catch (err) {
  console.error('Standard client test error:', err.message);
  console.log('This is expected in a Node.js script, would be handled by our fallback');
}

// Test 2: Use direct hardcoded values (fallback approach)
console.log('\nTest 2: Testing with hardcoded values (fallback client approach)');

const SUPABASE_URL = 'https://pozblfzhjqlsxkakhowp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvemJsZnpoanFsc3hrYWtob3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMDM0MDUsImV4cCI6MjA1NTY3OTQwNX0.qICEbtyj5hsnu489FuQFiwfFgAJbQ0zmul4sQX5ODbM';

console.log(`Direct URL: ${SUPABASE_URL}`);
console.log('Direct KEY: [HIDDEN]');

try {
  const fallbackClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Fallback client created successfully');
  
  // Test the connection
  const { data, error } = await fallbackClient.auth.getSession();
  if (error) {
    throw error;
  }
  console.log('Fallback client connection test: PASSED ✅');
} catch (err) {
  console.error('Fallback client test error:', err.message);
}

// Test 3: Test client selection helper (similar to our AuthContext implementation)
console.log('\nTest 3: Testing client selection helper');

function getClient() {
  // Try standard client first
  try {
    // Since we're in Node.js, we rely on process.env
    const envVars = process.env;
    const supabaseUrl = envVars.VITE_SUPABASE_URL;
    const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      console.log('Using standard client');
      return createClient(supabaseUrl, supabaseKey);
    }
  } catch (err) {
    console.warn('Error with standard client:', err.message);
  }
  
  // Fall back to direct client
  console.log('Using fallback client');
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

try {
  const selectedClient = getClient();
  console.log('Client selection successful');
  
  // Test the connection
  const { data, error } = await selectedClient.auth.getSession();
  if (error) {
    throw error;
  }
  console.log('Selected client connection test: PASSED ✅');
} catch (err) {
  console.error('Selected client test error:', err.message);
}

console.log('\nAll tests completed');