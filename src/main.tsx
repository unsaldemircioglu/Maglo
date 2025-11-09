import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';

import Login from './auth/Login.tsx';
import SignUp from './auth/SginUp.tsx';
import AuthRoute from './auth/AuthRoute.tsx';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


initializeApp(firebaseConfig);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/" element={<AuthRoute><App /></AuthRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* If you doesn't login... */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);

/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/