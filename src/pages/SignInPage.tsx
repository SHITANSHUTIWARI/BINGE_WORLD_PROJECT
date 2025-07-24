import React, { useState } from 'react';

interface SignInPageProps {
  onSignIn: (credentials: { email: string; password: string }) => void;
  onNavigate: (page: string) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignIn, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onSignIn({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">Sign In</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-[#B0B0B0] mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-[#333] focus:outline-none focus:border-[#F5C518]"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#B0B0B0] mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-[#333] focus:outline-none focus:border-[#F5C518]"
          />
        </div>
        <button type="submit" className="w-full bg-[#F5C518] text-black font-bold py-2 rounded-lg hover:bg-[#e6b015] transition-colors mb-4">
          Sign In
        </button>
        <div className="text-center text-[#B0B0B0]">
          Don't have an account?{' '}
          <button type="button" className="text-[#F5C518] hover:underline" onClick={() => onNavigate('sign-up')}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage; 