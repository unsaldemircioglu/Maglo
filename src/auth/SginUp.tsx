//Standart React Libaries
import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Navigate for direcly after login to dasboard
// Logo 
import Logo from "../components/Global/Logo";
// Icons Libaries
import { FcGoogle } from "react-icons/fc";
//Toast Libary
import toast, { Toaster } from "react-hot-toast";


//Sign Up Page
const Signup: React.FC = () => {
    {/* Auth System with firebase */}
  const auth = getAuth();
  const navigate = useNavigate();
    {/* Form state e-mail-password.... */}
  const [authing, setAuthing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  // Error handling
  console.log(error); // error in console

    {/* Toasts Sucess and */}
  const notifySuccess = () => toast.success("Welcome Your Maglo Ecosystem!");
  const notifyError = (msg?: string) =>
    toast.error(msg || "Please check your information.");

  {/* Sign-up with google */}
  const signUpWithGoogle = async () => {
    setAuthing(true);
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response.user.uid);
      notifySuccess();
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
      notifyError("Google sign-up failed.");
      setAuthing(false);
    }
  };

  {/* Error  Handling */}
  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      notifyError("Please check your information!");
      return;
    }

    setAuthing(true);
    setError("");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response.user.uid);
      notifySuccess();
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message); 
        notifyError(err.message); 
      } else {
        setError("An unknown error occurred."); 
        notifyError("An unknown error occurred.");
      }
      setAuthing(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Logo */}
      <div className="p-20 ml-10">
        <Logo />
      </div>

      {/* Left side - signup form */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-[450px]">
          <h3 className="text-3xl md:text-4xl font-bold mb-2 text-black">
            Sign Up
          </h3>
          <p className="text-base md:text-lg mb-6 text-gray-700">
            Welcome! Please enter your details.
          </p>
            {/* Name State */}
          <span>
            <p>Full Name</p>
          </span>
          <input
            type="text"
            placeholder="Mahfuzul Nabil"
            className="w-full text-black py-2 mb-4 bg-transparent border-b border-gray-700 focus:outline-none focus:border-black"
          />
          {/* Name E-Mail */}
          <span>
            <p>Email</p>
          </span>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full text-black py-2 mb-4 bg-transparent border-b border-gray-700 focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password */}
          <span>
            <p>Password</p>
          </span>
          <input
            type="password"
            placeholder="******"
            className="w-full text-black py-2 mb-4 bg-transparent border-b border-gray-700 focus:outline-none focus:border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Re-Password */}
          <span>
            <p>Re-Password</p>
          </span>
          <input
            type="password"
            placeholder="****** (again)"
            className="w-full text-black py-2 mb-4 bg-transparent border-b border-gray-700 focus:outline-none focus:border-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Button Sign-up */}
          <button
            className="w-full bg-[#b7db34] font-semibold text-black my-2 rounded-2xl p-3 text-center flex items-center justify-center cursor-pointer"
            onClick={signUpWithEmail}
            disabled={authing}
          >
            Sign Up
          </button>
          {/* Sign-Up Google */}
          <button
            className="w-full border border-gray-400 text-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-4"
            onClick={signUpWithGoogle}
            disabled={authing}
          >
            <FcGoogle className="mr-2" /> Sign up with Google
          </button>

          {/* Login + Green Line */}
          <div className="w-full flex flex-col items-center justify-center mt-10">
            <p className="text-sm font-normal text-gray-500">
              Already have an account?{" "}
              <span className="font-medium text-black">
                <a href="/login">Log In</a>
              </span>
            </p>
             <span className='ml-42 mt-1  flex justify-end-safe'>
              <svg width='45' height='8' viewBox='0 0 45 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0.901001 6.5C7.47045 1.56444 34.4948 -1.70074 43.901 6.49999' stroke='#C8EE44' strokeWidth='3' />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Right side - image area */}
      <div className="w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center bg-[#282c34]">
        <img
          src="/assets/banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
