import { defineConfig, loadEnv } from 'vite';

// This plugin logs environment variables during Vite startup
export function envDebugPlugin() {
  return {
    name: 'vite-plugin-env-debug',
    
    // Hook into config phase
    config(config, { command, mode }) {
      console.log(`[ENV DEBUG] Command: ${command}, Mode: ${mode}`);
      
      // Load env variables explicitly 
      const env = loadEnv(mode, process.cwd(), '');
      
      // Log all VITE_ prefixed variables
      console.log('\n[ENV DEBUG] Environment Variables:');
      Object.keys(env).filter(key => key.startsWith('VITE_')).forEach(key => {
        // Hide sensitive values
        const value = key.includes('KEY') ? '[HIDDEN]' : env[key];
        console.log(`  ${key}: ${value}`);
      });
      
      // Specifically check Supabase variables
      console.log('\n[ENV DEBUG] Critical Environment Variables:');
      console.log(`  VITE_SUPABASE_URL present: ${Boolean(env.VITE_SUPABASE_URL)}`);
      console.log(`  VITE_SUPABASE_ANON_KEY present: ${Boolean(env.VITE_SUPABASE_ANON_KEY)}`);
      
      return config;
    },
    
    // Log again during server initialization
    configureServer(server) {
      console.log('\n[ENV DEBUG] Server Environment Variables:');
      
      // Access resolved config
      const resolvedConfig = server.config;
      
      if (resolvedConfig && resolvedConfig.env) {
        Object.keys(resolvedConfig.env)
          .filter(key => key.startsWith('VITE_'))
          .forEach(key => {
            // Hide sensitive values
            const value = key.includes('KEY') ? '[HIDDEN]' : resolvedConfig.env[key];
            console.log(`  ${key}: ${value}`);
          });
      } else {
        console.log('  No environment variables found in resolved config');
      }
    }
  };
}

// Export a testing function
export default function testEnvLoading() {
  const mode = 'development';
  
  // Load env variables explicitly and log them
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('\nTesting Environment Variable Loading:');
  console.log('VITE_SUPABASE_URL:', env.VITE_SUPABASE_URL || 'Not found');
  console.log('VITE_SUPABASE_ANON_KEY present:', Boolean(env.VITE_SUPABASE_ANON_KEY));
  
  return { env };
}