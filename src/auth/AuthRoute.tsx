import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // user it was logened
        setUser(currentUser);
      } else {
        //  if user doesnt login bact to login page
        navigate('/login', { replace: true });
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  //  Firebase control loading screen
  if (checkingAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-[#b7db34] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#b7db34] rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-[#b7db34] rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">
            Checking user authentication...
          </p>
        </div>
      </div>
    );
  }

  // Login
  return <>{user ? children : null}</>;
};

export default AuthRoute;
