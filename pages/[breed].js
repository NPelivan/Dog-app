import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Pagination from '../components/Pagination';
import Header from '@/components/Header';

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
    <div>
    <Header />
<main className="p-4 pt-0 lg:p-20 lg:pt-0 lg:mt-10">
  <h2 className="capitalize text-2xl lg:text-3xl xl:text-4xl font-bold mb-4">Selected Breed: {breed}</h2>
  <div className="grid grid-cols-2 gap-3 gap-y-7 lg:grid-cols-4 lg:gap-y-8 lg:gap-4">
    {dogs.map((imageUrl, index) => (
      <div key={index} className="object-cover w-full rounded-md">
        <img src={imageUrl} className="object-cover w-full h-48 lg:h-80 rounded-md" alt={`dog-${index}`} />
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


      </div>
  );
};

export default DogBreeds;