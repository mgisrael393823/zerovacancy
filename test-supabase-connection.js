// Simple script to test Supabase connection
// Run with: node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js';

// Direct hardcoded values - same as our fallback client
const SUPABASE_URL = 'https://pozblfzhjqlsxkakhowp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvemJsZnpoanFsc3hrYWtob3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMDM0MDUsImV4cCI6MjA1NTY3OTQwNX0.qICEbtyj5hsnu489FuQFiwfFgAJbQ0zmul4sQX5ODbM';

console.log('Creating Supabase client with:');
console.log(`URL: ${SUPABASE_URL}`);
console.log('Key: [HIDDEN]');

// Create the client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test basic connection
async function testConnection() {
  try {
    console.log('\nTesting connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Connection test failed:', error.message);
      return false;
    }
    
    console.log('Connection test successful!');
    console.log('Session data:', data.session ? 'Found a session' : 'No active session');
    return true;
  } catch (err) {
    console.error('Connection test error:', err.message);
    return false;
  }
}

// Call the test function
testConnection()
  .then(success => {
    console.log(`\nOverall connection test: ${success ? 'PASSED ✅' : 'FAILED ❌'}`);
    process.exit(success ? 0 : 1);
  });