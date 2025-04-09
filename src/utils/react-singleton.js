// This script ensures React is properly initialized as a singleton to prevent
// dispatcher.useContext errors that can happen when multiple versions of React are loaded

// Store references to React and ReactDOM to use consistently throughout the app
import * as React from 'react';
// Import directly from client package to avoid warnings
import * as ReactDOM from 'react-dom/client';
import { flushSync, createPortal, findDOMNode, unmountComponentAtNode } from 'react-dom';

// Add DOM methods to the ReactDOM client export
ReactDOM.createPortal = createPortal;
ReactDOM.findDOMNode = findDOMNode;
ReactDOM.unmountComponentAtNode = unmountComponentAtNode;
ReactDOM.flushSync = flushSync;

// These variables will be used by Vite to externalize React
window.__REACT_SINGLETON__ = React;
window.__REACT_DOM_SINGLETON__ = ReactDOM;

// Export the singleton versions to be used throughout the app
export { React, ReactDOM };

// Make sure the module exports React as both default and named
export default React;