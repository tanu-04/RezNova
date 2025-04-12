'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSignupSuccess = async (credentialResponse: { credential: any; }) => {
    const idToken = credentialResponse.credential;
    console.log("Google ID Token:", idToken);

    // --- Backend Integration (Conceptual - You'll build this later) ---
    // try {
    //   const response = await fetch('/api/auth/google/signup', { // Replace with your backend API endpoint
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ token: idToken }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setSignupSuccess(true);
    //     setErrorMessage('');
    //     console.log('Google signup successful:', data);
    //     router.push('/dashboard'); // Redirect on success
    //   } else {
    //     setErrorMessage(data.message || 'Google signup failed on the server.');
    //     setSignupSuccess(false);
    //   }
    // } catch (error) {
    //   console.error('Error sending token to backend:', error);
    //   setErrorMessage('Failed to communicate with the server.');
    //   setSignupSuccess(false);
    // }
    // --- End of Backend Integration (Conceptual) ---

    // For this frontend-only example:
    setSignupSuccess(true);
    setErrorMessage('');
  };

  const handleGoogleSignupError = (error: any) => {
    console.error("Google Sign-In Error:", error);
    setErrorMessage('Google sign-in failed.');
    setSignupSuccess(false);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-2xl font-bold dark:text-white">Sign Up</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {signupSuccess ? (
          <p className="text-green-500">Signup successful! (In a real app, you'd be logged in or redirected).</p>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSignupSuccess}
            onError={handleGoogleSignupError}
            clientId="134754266846-hujn1t1cfs7sepoi4nobeklf2bnunq1v.apps.googleusercontent.com"
            render={(renderProps: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              >
                <Image
                  className="dark:invert mr-2"
                  src="/google.svg" // Ensure you have this in your public folder
                  alt="Google logo"
                  width={20}
                  height={20}
                />
                Sign up with Google
              </button>
            )}
            // You can also use the default Google button:
            // onSuccess={handleGoogleSignupSuccess}
            // onError={handleGoogleSignupError}
          />
        )}
        <p className="text-center text-sm dark:text-gray-400 mt-4">
          Already have an account? <Link href="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </p>
        {/* You can add other signup options (email/password) below */}
      </main>
      <footer className="row-start-3 text-center text-sm dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your Application Name</p>
      </footer>
    </div>
  );
}