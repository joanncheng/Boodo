import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import InfoSection from '../components/InfoSection';
import { homeObjOne } from './Data';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <NavBar toggle={toggle} user={user} />
      <InfoSection {...homeObjOne} />
    </>
  );
};

export default Home;
