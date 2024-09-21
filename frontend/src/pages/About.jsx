import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ValueProp from '../components/ValueProp';
import Heading from '../components/Heading';
import HorizontalRule from '../components/HorizontalRule';
import UrlStats from '../components/UrlStats';

const About = () => {
  document.title = 'About LinkEase';

  const navigate = useNavigate();
  return (
    <>
      <div className='min-h-screen'>
        <Navbar active={'/about'} />
        <Heading extraStyles={'text-center mt-32'} text={'About LinkEase'} />
        <p className='text-2xl w-5/6 mt-10 mx-auto text-center'>
          LinkEase is a URL shortening service designed to make your links more manageable and shareable.
          Whether you&apos;re looking to share a long URL on social media or track clicks for a campaign,
          <br /><br/>
          <span className='font-bold block'>LinkEase has got you covered!</span>
        </p>
        <HorizontalRule />
        <UrlStats />
        <HorizontalRule />
        <Heading extraStyles={'text-center mt-12'} text={'About the Creator'} />
        <img src='https://i.imgur.com/uFeG9uB.jpeg' alt='' className='block mx-auto w-48 md:w-56 rounded-full mt-10'/>
        <p className='text-xl lg:text-2xl w-5/6 mt-10 mx-auto text-center lg:px-30'>
          Edwin Ade is a web developer with a keen interest in specialising in backend development.
          He finished from Covenant University in 2024 with a B.Eng in Computer Engineering and he
          has a little experience in frontend and backend development. He is currently a software engineering
          student at ALX. When not coding, he enjoys watching football, and is an avid Chelsea supporter (yes,
          it&apos;s a tough life but KTBFFH).<br />
        </p>
        <HorizontalRule />
        <ValueProp handleClick={() => navigate('/')} />
        <h2 className='text-center text-2xl font-bold mb-12'>Ready to get started? Click the button above to go to our homepage!</h2>
      </div>
      <Footer />
    </>
  );
};

export default About;
