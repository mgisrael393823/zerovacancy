// Load the dotenv package
require('dotenv').config();

// Check and display Supabase environment variables
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'Key is set (not shown for security)' : 'Key is NOT set');

// Output all environment variables that start with VITE_
console.log('\nAll VITE_ environment variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('VITE_'))
  .forEach(key => {
    console.log(`${key}: ${key.includes('KEY') ? 'Value hidden for security' : process.env[key]}`);
  });