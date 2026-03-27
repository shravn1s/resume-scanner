import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import ChooseAuth from './components/ChooseAuth';
import Login from './components/Login';
import Signup from './components/Signup';
import ResumeMatcher from './components/ResumeMatcher';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/choose" element={<ChooseAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/match" element={<ResumeMatcher />} />
        <Route path="/matcher" element={<ResumeMatcher />} />
      </Routes>
    </Router>
  );
}
