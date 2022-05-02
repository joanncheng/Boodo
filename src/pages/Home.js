import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import { HeroContainer } from '../components/HeroSection.js/HeroSection.styled';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} />
      <HeroContainer />
    </>
  );
};

export default Home;
