import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loader.css'; // Make sure this file contains the updated CSS below

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/choose');
    }, 2500); // Delay to simulate loading

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-[#2B2B2B] flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
}
