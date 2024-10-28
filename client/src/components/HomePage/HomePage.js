// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnimalImage } from '../../api/imageApi';
import fetchAnimalVideos from '../../api/videoApi'; // Import the video API function
import './HomePage.css';

function HomePage() {
  const [animalImages, setAnimalImages] = useState({});
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const animals = [
    { name: 'Tiger', description: 'The largest cat species and a fierce predator.' },
    { name: 'Eagle', description: 'With exceptional vision, eagles are top predators in the sky.' },
    { name: 'Dolphin', description: 'Known for their intelligence and playfulness.' }
  ];

  // Fetch images and videos
  useEffect(() => {
    async function loadMedia() {
      // Fetch images
      const images = {};
      for (const animal of animals) {
        const imageUrl = await fetchAnimalImage(animal.name);
        images[animal.name] = imageUrl;
      }
      setAnimalImages(images);

      // Fetch videos
      const videoUrls = await fetchAnimalVideos('animals');
      setVideos(videoUrls);
    }
    loadMedia();
  }, []);

  // Rotate videos every 10 seconds
  useEffect(() => {
    if (videos.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 10000); // 10-second interval
      return () => clearInterval(intervalId);
    }
  }, [videos]);

  return (
    <div className="homepage">
      {/* Video and Hero Section */}
      <div className="hero-section">
        {videos.length > 0 && (
          <video
            key={currentVideoIndex}
            className="hero-video"
            src={videos[currentVideoIndex]}
            autoPlay
            loop
            muted
          />
        )}
        <div className="hero-content">
          <h1>Welcome to the Animal Info App</h1>
          <p>Discover fascinating facts about wildlife around the world!</p>
          <Link to="/search">
            <button className="cta-button">Explore Animals</button>
          </Link>
        </div>
      </div>

      {/* Featured Animals Section (below videos) */}
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
