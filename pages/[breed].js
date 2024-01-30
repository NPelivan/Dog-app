import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination';
import Header from '@/components/Header';
import Link from 'next/link';

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
        <Link href="/"><a className="Homepage--Link w-fit flex items-center gap-2 mb-5 text-lg lg:text-2xl lg:mb-9">
          <svg
      className='Link--arrow'
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.6722 15.3968L3.33331 10.0301L8.6722 4.66343C8.80388 4.4905 9.02432 4.41025 9.23636 4.45805C9.44839 4.50584 9.61308 4.6729 9.65784 4.8856C9.7026 5.0983 9.61921 5.31756 9.44442 5.44676L5.44998 9.47454L16.0778 9.47454C16.3846 9.47454 16.6333 9.72327 16.6333 10.0301C16.6333 10.3369 16.3846 10.5856 16.0778 10.5856L5.44998 10.5856L9.44442 14.6134C9.66073 14.8313 9.65949 15.1832 9.44165 15.3995C9.2238 15.6158 8.87185 15.6146 8.65553 15.3968L8.6722 15.3968Z" fill="black"/>
          </svg>
          <p>Back</p>
        </a></Link>
  <h2 className="capitalize mb-4 lg:mb-6 lg:text-3xl font-semibold">Selected Breed: {breed}</h2>
  <div className="grid grid-cols-2 gap-3 gap-y-7 lg:grid-cols-4 lg:gap-y-8 lg:gap-4">
    {dogs.map((imageUrl, index) => (
      <div key={index} className="object-cover w-full rounded-md">
        <img src={imageUrl} className="object-cover w-full h-48 md:h-64 xl:h-80 rounded-md" alt={`dog-${index}`} />
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