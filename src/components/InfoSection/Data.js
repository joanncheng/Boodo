import heroImg from '../../../public/images/heroImg.svg?url';
import aboutSecImg from '../../../public/images/aboutSecImg.svg?url';

export const homeObj1st = {
  id: 'hero',
  lightBg: false,
  imgStart: false,
  lightTopLine: true,
  lightText: true,
  topLine: "Welcome to Boodo's",
  headLine: 'Online collaborative whiteboard to get things done together',
  lightTextDesc: true,
  description:
    'Boodo’s virtual whiteboard helps you to innovate ideas together.',
  hasButton: true,
  buttonLabel: 'Get Started',
  img: heroImg,
  alt: 'Team collaboration image',
  imgShadow: false,
};

export const homeObj2nd = {
  id: 'about',
  lightBg: true,
  imgStart: true,
  lightTopLine: false,
  lightText: false,
  topLine: 'What is Boodo?',
  headLine: 'A simple online whiteboard tool',
  lightTextDesc: false,
  description:
    'You can use your computer, tablet or smartphone to easily express your ideas in drawing, and collaborate with others in real-time from anywhere.',
  hasButton: false,
  buttonLabel: '',
  img: aboutSecImg,
  alt: 'Team collaboration image',
  imgShadow: true,
};
