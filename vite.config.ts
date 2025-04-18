
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import excludeArchivedAssets from "./vite-exclude-archived-plugin.js";
import viteTipTapPlugin from "./vite-tiptap-plugin.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    // This is critical for SPA routing - redirects all requests to index.html
    historyApiFallback: true,
  },
  plugins: [
    // Plugin to exclude archived assets from the build
    excludeArchivedAssets(),
    
    // Plugin to properly handle TipTap dependencies
    viteTipTapPlugin(),
    
    react({
      // More aggressive optimizations in production
      transformOptions: {
        newDecorators: true, 
        typescript: true,
        development: mode === 'development',
      },
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    sourcemap: mode === 'development', // Only generate sourcemaps in development
    minify: 'esbuild', // Use esbuild for minification
    chunkSizeWarningLimit: 1000, // Increase chunk size limit
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'], // Modern browsers only for smaller bundles
    cssMinify: true,
    cssCodeSplit: false, // Disable CSS code splitting to prevent loading issues on mobile
    assetsInlineLimit: 4096, // Inline small assets to reduce HTTP requests
    rollupOptions: {
      output: {
        // Function-based manual chunks for better React deduplication
        manualChunks: function(id) {
          // Always put React in its own chunk
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          
          // React Router
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run/router')) {
            return 'react-router';
          }
          
          // UI Core libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'ui-core';
          }
          
          // Radix UI components
          if (id.includes('node_modules/@radix-ui/react-')) {
            return 'ui-radix';
          }
          
          // Our UI components
          if (id.includes('/components/ui/')) {
            // Animations
            if (id.includes('animated-grid') || 
                id.includes('spotlight') || 
                id.includes('moving-border')) {
              return 'animations';
            }
            
            // Basic UI components
            if (id.includes('button.tsx') || 
                id.includes('toast.tsx') || 
                id.includes('dialog.tsx') || 
                id.includes('tabs.tsx')) {
              return 'ui-components';
            }
          }
          
          // Let other modules use default chunking
          return null;
        },
        // Optimize chunk creation with more reliable naming for mobile
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop();
          if (extType === 'css') {
            // Use a stable name for CSS files to avoid mobile preloading issues
            return 'assets/css/styles.[ext]';
          }
          
          // Skip archived assets from being included in the build
          if (assetInfo.name && assetInfo.name.includes('archived-assets')) {
            return `excluded/[name]-[hash].[ext]`; // This puts them in a directory that's easy to filter out
          }
          
          return `assets/${extType}/[name]-[hash].[ext]`;
        },
      },
    },
    // Use esbuild for compression/minification
    esbuildOptions: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      pure: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
    },
    // Custom plugin to exclude archived assets from build
    plugins: [
      {
        name: 'exclude-archived-assets',
        enforce: 'post',
        apply: 'build',
        generateBundle(outputOptions, bundle) {
          Object.keys(bundle).forEach(key => {
            if (key.includes('archived-assets/') || key.includes('excluded/')) {
              delete bundle[key];
              console.log(`Excluded archived asset: ${key}`);
            }
          });
        }
      }
    ]
  },
  // Improve file system case sensitivity handling and dependency optimization
  optimizeDeps: {
    force: true, // Re-bundle dependencies to ensure case sensitivity is correct
    esbuildOptions: {
      target: 'es2020', // Modern JavaScript features for smaller output
      treeShaking: true,
      legalComments: 'none',
    },
    timeout: 60000, // Increase timeout to 60 seconds for TipTap dependencies
      include: [
        // React and React DOM for consistent deduplication
        'react',
        'react-dom',
        // React 18 client entry must be pre-bundled separately
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        // Error boundary package
        'react-error-boundary',
      
      // Pre-bundle these TipTap dependencies to prevent optimization timeouts
      '@tiptap/react',
      '@tiptap/core',
      '@tiptap/starter-kit',
      '@tiptap/extension-image',
      '@tiptap/extension-link',
      '@tiptap/extension-placeholder',
      '@tiptap/extension-text-align',
      '@tiptap/extension-table',
      '@tiptap/extension-table-row',
      '@tiptap/extension-table-cell',
      '@tiptap/extension-table-header',
      '@tiptap/extension-code-block'
    ],
  },
  // Additional performance optimizations
  esbuild: {
    legalComments: 'none',
    target: 'es2020',
    treeShaking: true,
  },
}));
