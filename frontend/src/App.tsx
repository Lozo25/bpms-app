// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ActivityPage from './pages/ActivityPage';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/activity"
              className={({ isActive }) =>
                isActive ? 'underline' : ''
              }
            >
              Деятельность
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/activity" element={<ActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;