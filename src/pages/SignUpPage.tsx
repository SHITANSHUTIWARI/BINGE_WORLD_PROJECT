import React, { useState } from 'react';

interface SignUpPageProps {
  onSignUp: (credentials: { email: string; password: string }) => void;
  onNavigate: (page: string) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onSignUp({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">Sign Up</h2>
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
        <div className="mb-4">
          <label className="block text-[#B0B0B0] mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-[#333] focus:outline-none focus:border-[#F5C518]"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#B0B0B0] mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white border border-[#333] focus:outline-none focus:border-[#F5C518]"
          />
        </div>
        <button type="submit" className="w-full bg-[#F5C518] text-black font-bold py-2 rounded-lg hover:bg-[#e6b015] transition-colors mb-4">
          Sign Up
        </button>
        <div className="text-center text-[#B0B0B0]">
          Already have an account?{' '}
          <button type="button" className="text-[#F5C518] hover:underline" onClick={() => onNavigate('sign-in')}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage; 