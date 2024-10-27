// client/src/components/AnimalSearch.js
import React, { useState } from 'react';
import axios from 'axios';

function AnimalSearch() {
  const [animalName, setAnimalName] = useState('');
  const [animalData, setAnimalData] = useState([]);

  const fetchAnimalData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/animals`, {
        params: { name: animalName }
      });
      setAnimalData(response.data);
    } catch (error) {
      console.error("Error fetching animal data", error);
    }
  };

  return (
    <div className="animal-search">
      <h1>Animal Search</h1>
      <input
        type="text"
        value={animalName}
        onChange={(e) => setAnimalName(e.target.value)}
        placeholder="Enter animal name"
      />
      <button onClick={fetchAnimalData}>Search</button>

      <div id="animal-info">
        {animalData.length === 0 ? (
          <p>No information available.</p>
        ) : (
          animalData.map((animal, index) => (
            <div key={index} className="animal">
              <h2>{animal.name}</h2>
              <p><strong>Scientific Name:</strong> {animal.taxonomy.scientific_name}</p>
              <p><strong>Family:</strong> {animal.taxonomy.family}</p>
              <p><strong>Diet:</strong> {animal.characteristics.diet}</p>
              <p><strong>Habitat:</strong> {animal.characteristics.habitat}</p>
              <p><strong>Lifespan:</strong> {animal.characteristics.lifespan}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AnimalSearch;
