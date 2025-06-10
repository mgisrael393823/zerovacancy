#!/bin/bash

# EMERGENCY DIRECT FIX
# This script creates a minimal build to bypass all issues with Vercel

echo "🚨 CREATING EMERGENCY DIRECT FIX 🚨"

# Create output directory
mkdir -p direct-build

# Copy the emergency bypass page as index.html
cp emergency-bypass.html direct-build/index.html

# Create a minimal _redirects file for Vercel/Netlify
echo "/* /index.html 200" > direct-build/_redirects

echo "Direct build created successfully! Upload the 'direct-build' folder directly to Vercel."
echo "Use the Vercel web interface, choose 'Upload' deployment method, and select the 'direct-build' folder."