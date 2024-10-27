// client/src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to the Animal Info App</h1>
      <p>Discover fascinating facts about animals!</p>
      <Link to="/search">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default HomePage;
