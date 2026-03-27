import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="h-screen flex items-center justify-center px-4 bg-[#EBEBEB]"
    >
      <div className="bg-transparent border-2 border-[#f5f5f5] p-8 rounded-xl w-full max-w-md shadow-md backdrop-blur-md">
        <h2 className="text-4xl text-center text-[#2b2b2b] font-playfair mb-6 tracking-wide">
          Sign Up
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form className="space-y-8 font-sans" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="relative w-full">
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="peer w-full px-4 py-2 bg-transparent border-b-2 border-[#ccc] text-[#2b2b2b] placeholder-transparent focus:outline-none focus:border-[#2b2b2b]"
            />
            <label
              htmlFor="username"
              className={`absolute left-4 transition-all duration-300 ease-in-out text-sm pointer-events-none
                ${username
                  ? 'top-[-1.2rem] text-[#2b2b2b]'
                  : 'top-2.5 text-[#888]'}
                peer-focus:top-[-1.2rem] peer-focus:text-sm peer-focus:text-[#2b2b2b]`}
            >
              Username
            </label>
          </div>

          {/* Password Field */}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="peer w-full px-4 py-2 bg-transparent border-b-2 border-[#ccc] text-[#2b2b2b] placeholder-transparent focus:outline-none focus:border-[#2b2b2b] pr-10"
            />
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-300 ease-in-out text-sm pointer-events-none
                ${password
                  ? 'top-[-1.2rem] text-[#2b2b2b]'
                  : 'top-2.5 text-[#888]'}
                peer-focus:top-[-1.2rem] peer-focus:text-sm peer-focus:text-[#2b2b2b]`}
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-[#888] hover:text-[#2b2b2b] transition"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-[#2b2b2b] text-white rounded-md font-medium hover:bg-[#1a1a1a] transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </motion.div>
  );
}
