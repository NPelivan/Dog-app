import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Search from '@/components/Search';
import styles from './HoverEffect.module.css';

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

       <div className='relative'>
         <svg
           className='absolute bottom-2.5'
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.51667 1.11111C4.52795 1.11111 1.29445 4.34461 1.29445 8.33333C1.29445 12.3221 4.52795 15.5556 8.51667 15.5556C12.5054 15.5556 15.7389 12.3221 15.7389 8.33333C15.7389 4.34461 12.5054 1.11111 8.51667 1.11111ZM8.51668 2.25C10.9777 2.24775 13.1976 3.72848 14.1409 6.00149C15.0842 8.2745 14.5651 10.892 12.8258 12.6329C11.0864 14.3739 8.46939 14.8954 6.19553 13.9541C3.92166 13.0129 2.4389 10.7943 2.4389 8.33333C2.45408 4.98208 5.16543 2.26825 8.51668 2.25ZM14.7945 13.8167L18.8889 17.9389C19.0288 18.0798 19.0829 18.2847 19.0309 18.4763C18.9788 18.668 18.8284 18.8173 18.6364 18.868C18.4444 18.9187 18.2399 18.8631 18.1 18.7222L14.0056 14.6L14.7945 13.8167Z" fill="black"/>
          </svg>
         <Search onSearch={handleSearch} />
        </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 gap-y-6 lg:gap-y-10 lg:gap-6">
  {filteredBreeds.map((breed) => (
    <li key={breed}>
      <Link href={`/${encodeURIComponent(breed)}`}>
        <a className={styles.zoomOnHover}>
          <div className="relative overflow-hidden rounded-md">
            <img
              src={breedImages[breed]}
              alt={breed}
              className="object-cover w-full h-48 lg:h-80 rounded-md"
            />
          </div>
          <p className="capitalize mt-1 lg:mt-2 text-2xl">{breed}</p>
        </a>
      </Link>
    </li>
  ))}
</ul>
    </div>
  );
};

export default Breeds;