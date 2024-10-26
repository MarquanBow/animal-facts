const apiUrl = 'https://api.api-ninjas.com/v1/animals';
const apiKey = 'Ez/EttHt6weMBs8aDPzyhQ==pGvFVlVCacsk7HNd'; // Replace with your actual API key


async function fetchAnimalData() {
  const animalName = document.getElementById('animal-name').value;
  if (!animalName) {
    alert("Please enter an animal name.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}?name=${animalName}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    displayAnimalInfo(data);
  } catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('animal-info').innerText = "Error fetching data.";
  }
}

function displayAnimalInfo(data) {
  const infoContainer = document.getElementById('animal-info');
  infoContainer.innerHTML = ""; // Clear previous data

  if (data.length === 0) {
    infoContainer.innerHTML = "<p>No information available for this animal.</p>";
    return;
  }

  data.forEach(animal => {
    const animalDiv = document.createElement('div');
    animalDiv.classList.add('animal');

    animalDiv.innerHTML = `
      <h2>${animal.name}</h2>
      <p><strong>Scientific Name:</strong> ${animal.taxonomy.scientific_name}</p>
      <p><strong>Family:</strong> ${animal.taxonomy.family}</p>
      <p><strong>Diet:</strong> ${animal.characteristics.diet}</p>
      <p><strong>Habitat:</strong> ${animal.characteristics.habitat}</p>
      <p><strong>Lifespan:</strong> ${animal.characteristics.lifespan}</p>
      <hr>
    `;
    infoContainer.appendChild(animalDiv);
  });
}
