import React, { useState } from 'react';
import { useUser } from 'reactfire';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import InfoSection from '../components/InfoSection';
import { homeObjOne } from './Data';

const Home = () => {
  const { data: user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} user={user} />
      <NavBar toggle={toggle} user={user} />
      <InfoSection {...homeObjOne} />
    </>
  );
};

export default Home;
