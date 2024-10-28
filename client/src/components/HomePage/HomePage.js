// client/src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnimalImage } from '../../api/imageApi';
import './HomePage.css';

function HomePage() {
  const [animalImages, setAnimalImages] = useState({});

  const animals = [
    { name: 'Tiger', description: 'The largest cat species and a fierce predator.' },
    { name: 'Eagle', description: 'With exceptional vision, eagles are top predators in the sky.' },
    { name: 'Dolphin', description: 'Known for their intelligence and playfulness.' }
  ];

  useEffect(() => {
    async function loadImages() {
      const images = {};
      for (const animal of animals) {
        const imageUrl = await fetchAnimalImage(animal.name);
        images[animal.name] = imageUrl;
      }
      setAnimalImages(images);
    }
    loadImages();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to the Animal Info App</h1>
        <p>Discover fascinating facts about wildlife around the world!</p>
        <Link to="/search">
          <button className="cta-button">Explore Animals</button>
        </Link>
      </div>

      {/* Featured Animals Section */}
      <div className="featured-animals">
        <h2>Featured Animals</h2>
        <div className="animal-cards">
          {animals.map((animal) => (
            <div key={animal.name} className="animal-card">
              <img
                src={animalImages[animal.name] || 'placeholder-image-url.jpg'}
                alt={animal.name}
              />
              <h3>{animal.name}</h3>
              <p>{animal.description}</p>
              <Link to="/search">
                <button>Learn More</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
