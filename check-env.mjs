// Load the dotenv package using ESM syntax
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Setup paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
config();

// Alternatively, read the .env file directly
const envPath = resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
console.log('Contents of .env file:');
console.log(envContent);

// Check and display Supabase environment variables
console.log('\nEnvironment variables from process.env:');
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'Key is set (not shown for security)' : 'Key is NOT set');

// Output all environment variables that start with VITE_
console.log('\nAll VITE_ environment variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('VITE_'))
  .forEach(key => {
    console.log(`${key}: ${key.includes('KEY') ? 'Value hidden for security' : process.env[key]}`);
  });