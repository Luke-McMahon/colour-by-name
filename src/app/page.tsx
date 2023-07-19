'use client';

import { useEffect, useState } from 'react';

function Footer() {
  return (
    <footer
      className='
    absolute bottom-0 w-full flex justify-center items-center h-12 text-white'
    >
      <p className='text-center'>
        Made with{' '}
        <span
          role='img'
          aria-label='love'
        >
          ❤️
        </span>{' '}
        by{' '}
        <a
          className='underline'
          href='https://github.com/luke-mcmahon'
          target='_blank'
          rel='noreferrer'
        >
          Luke McMahon
        </a>
      </p>
    </footer>
  );
}
export default function Home() {
  const [backgroundColour, setBackgroundColour] =
    useState('rgb(100, 150, 200)');

  const [name, setName] = useState('');

  // Debounce the name change
  useEffect(() => {
    const generateColour = () => {
      const baseRGBValues = [100, 150, 200];
      if (!name || name.length < 3)
        return `rgb(${baseRGBValues[0]}, ${baseRGBValues[1]}, ${baseRGBValues[2]})`;
      const characters = name.split('');
      const lengthFactor = characters.length / 6;
      const rgb = baseRGBValues.map((value, index) => {
        const character = characters[index];
        const characterCode = character.charCodeAt(0);
        const characterCodeFactor = characterCode / 255;
        const valueFactor = value * lengthFactor;
        const newValue = valueFactor * characterCodeFactor;
        return Math.round(newValue);
      });
      const colour = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      console.log(colour);
      setBackgroundColour(colour);
    };

    const timeout = setTimeout(() => {
      generateColour();
    }, 500);
    return () => clearTimeout(timeout);
  }, [name]);

  return (
    <main
      style={{
        backgroundColor: backgroundColour,
      }}
      className='flex min-h-screen flex-col items-center justify-center p-24'
    >
      <input
        className='w-64 p-2 m-2 border-b-2 border-white bg-transparent placeholder-slate-100'
        type='text'
        placeholder='Enter your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Footer />
    </main>
  );
}
