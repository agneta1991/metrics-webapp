import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import HomePage from './components/homePage';
import DetailsPage from './components/detailsPage';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="whole-page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countries/:query" element={<DetailsPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
