import { useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Global/Logo';
import { FcGoogle } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';

const Login: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  console.log(error);
  // alert(error)
  const [inputError, setInputError] = useState(false);

  const notifySuccess = () => toast.success('Welcome to your finance assistant!');
  const notifyError = () => toast.error('Please check your email and password.');
  const triggerInputError = () => {
    setInputError(true);
    setTimeout(() => setInputError(false), 2000);
  };

  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const token = await response.user.getIdToken(); // 🔑 Token al
      localStorage.setItem('accessToken', token);     // 💾 Sakla
      notifySuccess();
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error(err);
      notifyError();
      setAuthing(false);
    }
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError('');
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await response.user.getIdToken(); // 🔑 Token al
      localStorage.setItem('accessToken', token);     // 💾 Sakla
      notifySuccess();
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setError(err.message || 'Unknown Error');
      notifyError();
      triggerInputError();
      setAuthing(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='p-20 ml-10'>
        <Logo />
      </div>
      <div className='w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center p-6 md:p-12'>
        <div className='w-full max-w-[450px]'>
          <h3 className='text-3xl md:text-4xl font-bold mb-2 text-black'>Sign In</h3>
          <p className='text-base md:text-lg mb-6 text-gray-700'>Welcome Back! Please enter your details.</p>

          <span><p>Email</p></span>
          <input
            type='email'
            placeholder='example@gmail.com'
            className={`w-full text-black py-2 mb-4 bg-transparent border-b focus:outline-none focus:border-black ${
              inputError ? 'border-red-500' : 'border-gray-700'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={authing}
          />

          <span><p>Password</p></span>
          <input
            type='password'
            placeholder='******'
            className={`w-full text-black py-2 mb-4 bg-transparent border-b focus:outline-none focus:border-black ${
              inputError ? 'border-red-500' : 'border-gray-700'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={authing}
          />

          <button
            className='w-full bg-[#b7db34] font-semibold text-black my-2 rounded-2xl p-3 text-center flex items-center justify-center cursor-pointer h-12'
            onClick={signInWithEmail}
            disabled={authing}
          >
            {authing ? (
              <div className='w-6 h-6 border-4 border-t-transparent border-black rounded-full animate-spin'></div>
            ) : (
              'Sign In'
            )}
          </button>

          <button
            className='w-full border border-gray-400 text-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-4'
            onClick={signInWithGoogle}
            disabled={authing}
          >
            <FcGoogle className='mr-2' /> Sign in with Google
          </button>

          <div className='w-full flex flex-col items-center justify-center mt-7'>
            <p className='text-sm font-normal text-gray-500'>
              Don't have an account?{' '}
              <span className='font-medium text-black '>
                <a href='/signup'>Sign Up</a>
              </span>
            </p>
            <span className='ml-38 mt-1 flex justify-end-safe'>
              <svg width='45' height='8' viewBox='0 0 45 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0.901001 6.5C7.47045 1.56444 34.4948 -1.70074 43.901 6.49999' stroke='#C8EE44' strokeWidth='3' />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center bg-[#282c34]'>
        <img src='/assets/banner.png' alt='Banner' className='w-full h-full object-cover' />
      </div>
    </div>
  );
};

export default Login;
