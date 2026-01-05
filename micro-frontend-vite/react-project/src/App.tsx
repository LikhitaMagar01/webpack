import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Profile';

function Home() {
  return (
    <>
      <div>hi! i am react app updated</div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
