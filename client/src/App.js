import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SummarizerForm from './components/SummarizerForm';
import SummaryHistory from './components/SummaryHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<SummarizerForm />} />
            <Route path="/history" element={<SummaryHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 