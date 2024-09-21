import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import '../index.css';
import Footer from '../components/Footer';
import HorizontalRule from '../components/HorizontalRule';
import urlService from '../services/urlService';
import logger from '../utils/logger';
import debounce from '../utils/debounce';
import ErrorMsg from '../components/ErrorMsg';
import InputActionBox from '../components/InputActionBox';
import UrlStats from '../components/UrlStats';
import ValueProp from '../components/ValueProp';
import ScrollToTop from '../utils/scrollToTop';
import Features from '../components/Features';
import MiniShortUrlMsg from '../components/MiniShortUrlCard';
import formatUrl from '../utils/formatUrl';

const Home = () => {
  document.title = 'LinkEase';

  const [fullUrl, setFullUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [fullUrlError, setFullUrlError] = useState(null);
  const [customUrlError, setCustomUrlError] = useState(null);
  const [displayUrl, setDisplayUrl] = useState(null);

  const validateUrl = (url, re) => {
    if (!url)
      return false;
    return !re.test(url);
  };

  const fullUrlCheck = () => {
    const re = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})(\/[^\s]*)?$/;
    const error = validateUrl(formatUrl(fullUrl), re);
    if (error) {
      setFullUrlError('Please enter a valid URL, starting with http:// or ' +
        'https://, followed by a valid domain name.');
      setDisplayUrl(null);
    }
    else
      setFullUrlError(null);
  };

  const customUrlCheck = () => {
    const re = /^[a-zA-Z0-9]+$/;
    const error = validateUrl(formatUrl(customUrl), re);
    if (error)
      setCustomUrlError('Custom URL can only contain letters and numbers. ' +
        'No spaces or special characters are allowed.');
    else
      setCustomUrlError(null);
  };

  useEffect(debounce(fullUrlCheck, 750), [fullUrl]);

  useEffect(debounce(customUrlCheck, 750), [customUrl]);

  const shortenClick = (e) => {
    e.preventDefault();
    let shortId;
    if (!customUrl)
      shortId = undefined;
    else
      shortId = customUrl;
    urlService.create({
      fullUrl: formatUrl(fullUrl),
      shortId: shortId ? formatUrl(shortId) : shortId
    })
      .then(shorturl => {
        setDisplayUrl(shorturl);
      })
      .catch(async err => {
        const prevError = fullUrlError;
        setFullUrlError(err.toString());
        setTimeout(() => setFullUrlError(prevError), 3000);
      });
  };

  const handleCustomUrlChange = (e) => {
    const newVal = e.target.value;
    setCustomUrl(newVal);
  };

  const handleFullUrlChange = (e) => {
    const newVal = e.target.value;
    setFullUrl(newVal);
  };

  const startBtnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className='min-h-screen'>
        <Navbar active={'/'} />
        <div className='mt-24 lg:mt-36 text-center'>
          <Heading text='URL Shortener' />
          <p className='text-gray-600'>Quickly shorten long URLs for easy tracking and sharing</p>
          <form className='mt-5 md:mt-10'>
            <InputActionBox
              containerStyles={'flex flex-row flex-wrap justify-center sm:w-full lg:w-3/4 mx-auto items-center gap-9'}
              placeholderText={'Enter long URL.....'}
              inputClass={'border-2 border-gray-300 p-2 text-lg' +
                ' focus:outline outline-2 outline-gray-500 rounded-lg w-3/4 xl:w-1/2 md:p-4'}
              inputValue={fullUrl}
              buttonText={'Shorten URL'}
              handleInputChange={handleFullUrlChange}
              handleClick={shortenClick}
              isButtonDisabled={(!fullUrl || !!customUrlError || !!fullUrlError)}
              buttonExtraStyles={'disabled:bg-gray-400'}
            />
            {fullUrlError && <ErrorMsg text={fullUrlError} />}
            {displayUrl && <MiniShortUrlMsg urlDetails={displayUrl} />}
            <h2 className='text-lg font-bold mb-2 mt-8'>Create personalised URL code or leave blank</h2>
            <input type='text' placeholder='Enter custom URL code' className='border-2 border-gray-300 p-2 text-lg
            focus:outline outline-2 outline-gray-500 rounded-lg w:1/2 lg:w-1/4 md:p-4'
              onChange={handleCustomUrlChange} value={customUrl} />
            {customUrlError && <ErrorMsg text={customUrlError} />}
          </form>
          <p className='text-gray-600 mt-10'>By clicking the Shorten URL you agree to the <a href='/t8k8a'
            target='_blank' className='underline'>Terms of Use and Privacy Policy</a></p>
        </div>
        <HorizontalRule />
        <Features />
        <HorizontalRule />
        <UrlStats />
        <HorizontalRule />
        <ValueProp handleClick={startBtnClick} />
        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
};

export default Home;
