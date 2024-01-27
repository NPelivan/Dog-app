import React, { useState, useEffect } from 'react';
import Link from 'next/link';

async function getBreedImage(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/1`);
  const data = await response.json();
  return data.message[0];
}

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [breedImages, setBreedImages] = useState({});

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const breedList = Object.keys(data.message);
        setBreeds(breedList);

        // Fetch images for each breed
        const imagesPromises = breedList.map(async (breed) => {
          const image = await getBreedImage(breed);
          return { [breed]: image };
        });

        const images = await Promise.all(imagesPromises);
        const imagesMap = images.reduce((acc, current) => ({ ...acc, ...current }), {});
        setBreedImages(imagesMap);
      } catch (error) {
        console.error('Error fetching dog breeds:', error.message);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div>
      <h1>List of Dog Breeds</h1>
      <ul>
        {breeds.map((breed) => (
          <li key={breed}>
            <Link href={`/${encodeURIComponent(breed)}`}>
              <a>
                <img src={breedImages[breed]} alt={breed} width="50" height="50" />
                {breed}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breeds;