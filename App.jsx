import React from 'react';
import { AuthProvider } from './components/context/AuthProvider';
import Root from './Root';

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  )
}
