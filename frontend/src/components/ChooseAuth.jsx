import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ChooseAuth() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#2B2B2B] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[#EBEBEB] p-10 rounded-lg shadow-lg w-[90%] max-w-md text-center"
      >
        <h1 className="text-4xl font-playfair font-semibold text-black mb-4 tracking-wide">
          HireWise
        </h1>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-[#2B2B2B] text-white py-2 px-4 rounded-md hover:bg-[#1f1f1f] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#2B2B2B] text-white py-2 px-4 rounded-md hover:bg-[#1f1f1f] transition"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
}
