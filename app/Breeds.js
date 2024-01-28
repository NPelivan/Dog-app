import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Search from '@/components/Search';

async function getBreedImage(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/1`);
  const data = await response.json();
  return data.message[0];
}

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [breedImages, setBreedImages] = useState({});
  const [filteredBreeds, setFilteredBreeds] = useState([]);

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

  useEffect(() => {
    // Set filteredBreeds to all breeds initially
    setFilteredBreeds(breeds);
  }, [breeds]);

  const handleSearch = (searchTerm) => {
    // If the search term is empty, display all breeds
    if (!searchTerm.trim()) {
      setFilteredBreeds(breeds);
    } else {
      // Filter breeds based on the search term
      const filtered = breeds.filter((breed) => breed.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredBreeds(filtered);
    }
  };


   return (
    <div className="p-4 lg:p-20 pt-0 lg:pt-0">
      <h2 className="mb-4">List of Dog Breeds</h2>


      <Search onSearch={handleSearch} />

      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {filteredBreeds.map((breed) => (
          <li key={breed}>
            <Link href={`/${encodeURIComponent(breed)}`}>
              <a>
                <img
                  className="object-cover w-full h-48 rounded-md"
                  src={breedImages[breed]}
                  alt={breed}
                />
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