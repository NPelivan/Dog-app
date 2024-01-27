import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

async function getDogs(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/20`);
  const data = await response.json();
  return data.message;
}

const DogBreeds = () => {
  const router = useRouter();
  const { breed } = router.query;
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogsByBreed = async () => {
      if (breed) {
        const dogsData = await getDogs(breed);
        setDogs(dogsData);
      }
    };

    fetchDogsByBreed();
  }, [breed]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Breeds</h1>
      <h2>Selected Breed: {breed}</h2>
      <div className="flex flex-wrap">
        {dogs.map((imageUrl, index) => (
          <div key={index} className="m-2">
            <Image src={imageUrl} width="200" height="200" alt={`dog-${index}`} priority />
          </div>
        ))}
      </div>
    </main>
  );
};

export default DogBreeds;