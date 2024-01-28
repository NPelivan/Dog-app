import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Pagination from '../components/Pagination';

async function getDogs(breed, page = 1, imagesPerPage = 20) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();
  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  return data.message.slice(startIndex, endIndex);
}

async function getTotalPages(breed, imagesPerPage = 20) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();
  const totalImages = data.message.length;
  return Math.ceil(totalImages / imagesPerPage);
}

const DogBreeds = () => {
  const router = useRouter();
  const { breed } = router.query;
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDogsByBreed = async () => {
      if (breed) {
        const dogsData = await getDogs(breed, currentPage);
        setDogs(dogsData);
      }
    };

    fetchDogsByBreed();
  }, [breed, currentPage]);

  useEffect(() => {
    const fetchTotalPages = async () => {
      if (breed) {
        const totalPages = await getTotalPages(breed);
        setTotalPages(totalPages);
      }
    };

    fetchTotalPages();
  }, [breed]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </main>
  );
};

export default DogBreeds;