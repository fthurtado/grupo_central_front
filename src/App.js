import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import DiseasesView from './views/DiseasesView';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<DiseasesView />}
        />
      </Routes>
    </Router>
  );
}

export default App;
