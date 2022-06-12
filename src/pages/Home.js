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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240">
        <path
          fill="#010606"
          fillOpacity="1"
          d="M0,64L60,101.3C120,139,240,213,360,213.3C480,213,600,139,720,117.3C840,96,960,128,1080,144C1200,160,1320,160,1380,160L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <InfoSection class="about" {...homeObj2nd} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 320">
        <path
          fill="#010606"
          fillOpacity="1"
          d="M0,128L40,138.7C80,149,160,171,240,186.7C320,203,400,213,480,192C560,171,640,117,720,112C800,107,880,149,960,138.7C1040,128,1120,64,1200,53.3C1280,43,1360,85,1400,106.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <FeaturesSection />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#010606"
          fillOpacity="1"
          d="M0,128L40,138.7C80,149,160,171,240,186.7C320,203,400,213,480,192C560,171,640,117,720,112C800,107,880,149,960,138.7C1040,128,1120,64,1200,53.3C1280,43,1360,85,1400,106.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <CtaSection />
      <Footer />
    </>
  );
};

export default Home;
