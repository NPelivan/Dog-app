import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <Link href="/">
      <a className='w-fit block'>
        <div className='flex flex-row-reverse items-center justify-end mb-6'>
        <h1 className='text-32'>Dog App</h1>
        <Image src="/images/dog.svg" alt="Example SVG" width={100} height={100} />
        </div>
      </a>
      </Link>
  );
};

export default Header;