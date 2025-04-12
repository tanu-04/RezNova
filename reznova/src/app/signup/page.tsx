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

        // --- Backend Integration (The Real Implementation) ---
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
        //     router.push('/dashboard'); // Redirect to /dashboard on successful backend signup
        //   } else {
        //     setErrorMessage(data.message || 'Google signup failed on the server.');
        //     setSignupSuccess(false);
        //   }
        // } catch (error) {
        //   console.error('Error sending token to backend:', error);
        //   setErrorMessage('Failed to communicate with the server.');
        //   setSignupSuccess(false);
        // }
        // --- End of Backend Integration ---

        // For this frontend-only example, simulate success and redirect:
        setSignupSuccess(true);
        setErrorMessage('');
        router.push('/dashboard'); // Redirect on frontend "success"
    };

    const handleGoogleSignupError = (error: any) => {
        console.error("Google Sign-In Error:", error);
        setErrorMessage('Google sign-in failed.');
        setSignupSuccess(false);
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            alignItems: 'center',
            justifyItems: 'center',
            minHeight: '100vh',
            padding: '2rem',
            paddingBottom: '5rem',
            gap: '2rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <main style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                rowStart: 2,
                alignItems: 'center'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#fff'
                }}>Sign Up</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {signupSuccess ? (
                    <p style={{ color: 'green' }}>Signup successful! Redirecting to dashboard...</p>
                ) : (
                    <GoogleLogin
                        onSuccess={handleGoogleSignupSuccess}
                        onError={handleGoogleSignupError}
                        clientId="134754266846-hujn1t1cfs7sepoi4nobeklf2bnunq1v.apps.googleusercontent.com"
                        render={(renderProps: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                style={{
                                    borderRadius: '2rem',
                                    border: '0.1rem solid rgba(0, 0, 0, 0.08)',
                                    padding: '0.75rem 1.5rem',
                                    transition: 'background-color 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    height: '2.75rem',
                                    width: '100%',
                                    maxWidth: '30rem',
                                    backgroundColor: '#fff',
                                    color: '#000'
                                }}
                            >
                                <Image
                                    className="dark:invert mr-2"
                                    src="/google.svg"
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                />
                                Sign up with Google
                            </button>
                        )}
                    />
                )}
                <p style={{
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: '#d1d5db',
                    marginTop: '1rem'
                }}>
                    Already have an account? <Link href="/signin" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Sign In</Link>
                </p>
                {/* You can add other signup options (email/password) below */}
            </main>
            <footer style={{
                rowStart: 3,
                textAlign: 'center',
                fontSize: '0.9rem',
                color: '#d1d5db'
            }}>
                <p>&copy; {new Date().getFullYear()} RezNova</p>
            </footer>
        </div>
    );
}
