import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import InfoSection from '../components/InfoSection';
import { homeObj1st, homeObj2nd } from '../components/InfoSection/Data';
import FeaturesSection from '../components/FeaturesSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const Home = () => {
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} user={user} />
      <NavBar toggle={toggle} user={user} />
      <InfoSection {...homeObj1st} />
      <InfoSection {...homeObj2nd} />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </>
  );
};

export default Home;
