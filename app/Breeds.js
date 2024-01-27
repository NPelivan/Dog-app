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
    <div className='p-4 lg:p-20 pt-0 lg:pt-0'>
      <h2 className='mb-4'>List of Dog Breeds</h2>
      <ul className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {breeds.map((breed) => (
          <li key={breed}>
            <Link href={`/${encodeURIComponent(breed)}`}>
              <a>
                <img className='object-cover w-full h-48 rounded-md' src={breedImages[breed]} alt={breed} />
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