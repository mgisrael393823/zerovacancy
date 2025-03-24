import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { LockKeyhole, AlertCircle } from 'lucide-react';

/**
 * Simplified AdminLogin component
 */
const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const mountedRef = useRef(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSideRendered, setClientSideRendered] = useState(false);
  
  // Set flag for client-side rendering to avoid hydration mismatch
  useEffect(() => {
    // This will only run on the client
    setClientSideRendered(true);
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Check if already authenticated
  useEffect(() => {
    // Only run this effect if authentication state is loaded and component is mounted
    if (!isLoading && mountedRef.current && isAuthenticated) {
      navigate('/admin/blog');
    }
  }, [isAuthenticated, navigate, isLoading]);

  // Handle the login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Sign in with Supabase
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Set admin token to grant access
      sessionStorage.setItem('adminAccessToken', 'granted');
      
      // Discretely log access for security monitoring
      console.info('Admin login successful:', new Date().toISOString());
      
      // Store last login time for reference
      localStorage.setItem('admin_last_login', new Date().toISOString());
      
      // Success - go to admin panel
      navigate('/admin/blog');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in');
      sessionStorage.removeItem('adminAccessToken');
    } finally {
      setLoading(false);
    }
  };
  
  // Use a loading state to prevent hydration mismatch
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-brand-purple rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Admin Login | ZeroVacancy"
        description="Admin access only"
        noindex={true}
      />
      
      {/* Only render the form once we're on the client side */}
      {clientSideRendered && (
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Blog Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage blog posts and content
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-purple focus:border-brand-purple focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-purple focus:border-brand-purple focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-purple hover:bg-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple"
                disabled={loading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockKeyhole size={16} className="h-5 w-5 text-brand-purple-light group-hover:text-white" />
                </span>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
            
            {/* Quick instructions for team members */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                <strong>Team Access:</strong> Use your ZeroVacancy account email and password
              </p>
              <p className="mt-1">
                Contact admin if you need access or forgot credentials
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;